import { EVALUATION_PERIOD } from '@constants/evaluations'
import { ROLES } from '@constants/roles'
import { DepartmentsI18nService } from '@core/departments-i18n/departments-i18n.service'
import { DepartmentsService } from '@core/departments/departments.service'
import { EvaluationsService } from '@core/evaluations/evaluations.service'
import { LdapService } from '@core/ldap/ldap.service'
import { PerformedEvaluationsService } from '@core/performed-evaluations/performed-evaluations.service'
import { UsersService } from '@core/users/users.service'
import { Inject, Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { readdirSync, unlinkSync } from 'fs'

@Injectable()
export class CronsService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(LdapService) private readonly ldapService: LdapService,
    @Inject(DepartmentsService) private readonly departmentsService: DepartmentsService,
    @Inject(DepartmentsI18nService) private readonly departmentsI18nService: DepartmentsI18nService,
    @Inject(EvaluationsService) private readonly evaluationsService: EvaluationsService,
    @Inject(PerformedEvaluationsService) private readonly peService: PerformedEvaluationsService
  ) {}

  @Cron('* 00 * * *')
  clearReportsPath(): void {
    const path = 'downloads/reports'
    readdirSync(path).map((file) => unlinkSync(`${path}/${file}`))
  }

  @Cron('* 01 * * *')
  async createDepartments(): Promise<void> {
    const users = await this.usersService.list()

    for (const user of users) {
      try {
        const userLdap = await this.ldapService.getByUsername(user.username)

        if (![ROLES.ADMIN, ROLES.DIRECTOR].includes(user.role) && userLdap?.department) {
          const name = userLdap?.department

          const departmentI18N = await this.departmentsI18nService.getBy({ name })

          if (!departmentI18N) {
            const key = name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[\s/_]+/g, '_')

            console.log(`creating department... ${key}: ${name}`)

            try {
              await this.departmentsService.create({ key, name })
            } catch {
              console.log(`could not create department... ${key}: ${name}`)
            }
          }
        }
      } catch {
        continue
      }
    }
  }

  @Cron('* 02 * * *')
  async updateUsersManager(): Promise<void> {
    const users = await this.usersService.list()

    console.log('updating users manager...')
    for (const user of users) {
      try {
        if (![ROLES.ADMIN, ROLES.DIRECTOR].includes(user.role)) {
          const userLdap = await this.ldapService.getByUsername(user.username)

          const managerLdap = await this.ldapService.getByRaw(userLdap.manager)
          if (managerLdap) {
            const manager = await this.usersService.getBy({ username: managerLdap.username })

            await this.usersService.update(manager.id, { role: ROLES.MANAGER })
            await this.usersService.update(user.id, { idManager: manager.id })
          }

          if (!userLdap.directReports.length) {
            await this.usersService.update(user.id, { role: ROLES.USER })
          }
        }
      } catch {
        continue
      }
    }
    console.log('finished update users manager!')
  }

  @Cron('* 03 * * *')
  async updateUserDepartment(): Promise<void> {
    const users = await this.usersService.list()
    for (const user of users) {
      try {
        const userLdap = await this.ldapService.getByUsername(user.username)
        if (![ROLES.ADMIN, ROLES.DIRECTOR].includes(user.role) && userLdap?.department) {
          const departmentI18N = await this.departmentsI18nService.getBy(
            {
              name: userLdap.department
            },
            { relations: true }
          )

          if (departmentI18N) {
            console.log(`updating user department... ${departmentI18N.name}: ${user.username}`)

            try {
              const department = await this.departmentsService.get(departmentI18N.department.id)
              await this.usersService.update(user.id, { department: department.id })
            } catch {
              console.log(
                `could not update user department... ${departmentI18N.name}: ${user.username}`
              )
            }
          }
        }
      } catch {
        continue
      }
    }
  }

  @Cron('* 04 * * *')
  async normalizePeriodEvaluations(): Promise<void> {
    const evaluations = await this.evaluationsService.list()

    // MID EVALUATIONS
    const midEvaluations = evaluations.filter((evaluation) => {
      const midDateStart = new Date(evaluation.midDate.start).getTime()
      const midDateDeadline = new Date(evaluation.midDate.deadline).getTime()
      const today = new Date().getTime()
      return (
        midDateStart <= today &&
        midDateDeadline >= today &&
        evaluation.period !== EVALUATION_PERIOD.MID
      )
    })
    for (const midEvaluation of midEvaluations) {
      await this.evaluationsService.update(midEvaluation.id, { period: EVALUATION_PERIOD.MID })
    }

    // END EVALUATIONS
    const endEvaluations = evaluations.filter((evaluation) => {
      const endDateStart = new Date(evaluation.endDate.start).getTime()
      const endDateDeadline = new Date(evaluation.endDate.deadline).getTime()
      const today = new Date().getTime()
      return (
        endDateStart <= today &&
        endDateDeadline >= today &&
        evaluation.period !== EVALUATION_PERIOD.END
      )
    })
    for (const endEvaluation of endEvaluations) {
      await this.evaluationsService.update(endEvaluation.id, { period: EVALUATION_PERIOD.END })
      await this.peService.updateMany(
        { evaluation: { id: endEvaluation.id } },
        { midFinished: true }
      )
    }

    // OUT EVALUATIONS
    const outEvaluations = evaluations.filter((evaluation) => {
      const endDate = new Date(evaluation.endDate.deadline)
      return new Date().getTime() > endDate.getTime() && evaluation.period !== EVALUATION_PERIOD.OUT
    })
    for (const outEvaluation of outEvaluations) {
      await this.evaluationsService.update(outEvaluation.id, { period: EVALUATION_PERIOD.OUT })
      await this.peService.updateMany(
        { evaluation: { id: outEvaluation.id } },
        { midFinished: true, endFinished: true }
      )
    }
  }
}
