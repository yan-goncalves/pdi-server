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
  async updateUsersManager(): Promise<void> {
    const users = await this.usersService.list()
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
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
    }
  }

  @Cron('* 02 * * *')
  async updateUserDepartment(): Promise<void> {
    const users = await this.usersService.list()
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      const userLdap = await this.ldapService.getByUsername(user.username)
      if (![ROLES.ADMIN, ROLES.DIRECTOR].includes(user.role) && userLdap?.department) {
        const departmentI18N = await this.departmentsI18nService.getBy(
          {
            name: userLdap.department
          },
          { relations: true }
        )

        if (departmentI18N) {
          const department = await this.departmentsService.get(departmentI18N.department.id)
          await this.usersService.update(user.id, { department: department.id })
        }
      }
    }
  }

  @Cron('* 03 * * *')
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
