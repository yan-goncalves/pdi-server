import { LOCALES } from '@constants/locales'
import { EvaluationsService } from '@core/evaluations/evaluations.service'
import { FeedbacksI18nService } from '@core/feedbacks-i18n/feedbacks-i18n.service'
import { GoalsService } from '@core/goals/goals.service'
import { KpiModel } from '@core/kpis/entities/kpi.entity'
import { PdiQualityModel } from '@core/pdi-qualities/entities/pdi-quality.entity'
import { PerformedEvaluationModel } from '@core/performed-evaluations/entities/performed-evaluation.entity'
import { PerformedEvaluationsService } from '@core/performed-evaluations/performed-evaluations.service'
import { QuestionsI18nService } from '@core/questions-i18n/questions-i18n.service'
import { SkillsI18nService } from '@core/skills-i18n/skills-i18n.service'
import { UsersService } from '@core/users/users.service'
import { Injectable, StreamableFile } from '@nestjs/common'
import { randomUUID } from 'crypto'
import * as ExcelModule from 'exceljs'
import { createReadStream, existsSync, mkdirSync } from 'fs'
import { ReportDto } from './dto/report.dto'

@Injectable()
export class ReportsService {
  constructor(
    private readonly performedService: PerformedEvaluationsService,
    private readonly goalsService: GoalsService,
    private readonly usersService: UsersService,
    private readonly evaluationsService: EvaluationsService,
    private readonly questionsI18nService: QuestionsI18nService,
    private readonly skillsI18nService: SkillsI18nService,
    private readonly feedbacksI18nService: FeedbacksI18nService
  ) {}

  async download(uuid: string): Promise<StreamableFile> {
    const file = createReadStream(`downloads/reports/${uuid}.xlsx`)
    return new StreamableFile(file)
  }

  async generate({ usersIds, evaluationId, locale }: ReportDto): Promise<{ uuid: string }> {
    const filePath = 'downloads/reports'
    if (!existsSync(filePath)) {
      mkdirSync(filePath, { recursive: true })
    }

    const workbook = new ExcelModule.Workbook()
    for (const userId of usersIds) {
      await this.generateUserReport(userId, evaluationId, locale, workbook)
    }
    const uuid = randomUUID()
    await workbook.xlsx.writeFile(`downloads/reports/${uuid}.xlsx`)

    return { uuid }
  }

  private async generateUserReport(
    userId: number,
    evaluationId: number,
    locale: LOCALES,
    workbook: ExcelModule.Workbook
  ): Promise<void> {
    const user = await this.usersService.get({ id: userId }, { loadRelations: true })
    const evaluation = await this.evaluationsService.getBy({ id: evaluationId })

    const sections = evaluation.sections?.filter((section) => section.visibility[user.role])

    const questionIds = sections.flatMap((s) => s.questions.map((q) => q.id))
    const questions = await this.questionsI18nService.listByQuestionsIds(questionIds, locale)
    const questionsCount = questions.length

    const skillsIds = sections.flatMap((s) => s.skills.map((k) => k.id))
    const skills = await this.skillsI18nService.listBySkillsIds(skillsIds, locale)
    const skillsCount = skills.length

    const feedbacksIds = evaluation.feedbacks.map((f) => f.id)
    const feedbacks = await this.feedbacksI18nService.listByFeedbacksIds(feedbacksIds, locale)
    const feedbacksCount = feedbacks.length

    let performed: PerformedEvaluationModel
    try {
      performed = await this.performedService.getByRelation({
        idEvaluation: evaluation.id,
        idUser: user.id
      })
    } catch {
      performed = await this.performedService.create({
        idEvaluation: evaluation.id,
        idUser: user.id
      })

      performed.questions = []
      performed.skills = []
      performed.goals = []
      performed.feedbacks = []
      performed.pdiCoaching = []
      performed.pdiCompetence = []
      performed.pdiQuality = []
    }

    const evaluationGoals = await this.goalsService.evaluationGoals({
      idEvaluation: evaluation.id,
      idUser: user.id
    })
    const kpis: KpiModel[] = []

    evaluationGoals.map((g) => g?.kpis.length && kpis.push(...g.kpis))
    const kpisCount = kpis.length

    const pdiStrength: PdiQualityModel[] = []
    const pdiWeakness: PdiQualityModel[] = []
    performed.pdiQuality.forEach((q) =>
      q.category === 'WEAKNESS' ? pdiWeakness.push(q) : pdiStrength.push(q)
    )

    const pdiStrengthCount = pdiStrength.length || 1
    const pdiWeaknessCount = pdiWeakness.length || 1

    const pdiCompetence = performed.pdiCompetence
    const pdiCompetenceCount = pdiCompetence.length || 1

    const pdiCoaching = performed.pdiCoaching
    const pdiCoachingCount = pdiCoaching.length || 1

    const pdiCount = pdiStrengthCount + pdiWeaknessCount + pdiCoachingCount + pdiCompetenceCount + 1

    const startRowCount = 6
    const contentJustifyStyle: Partial<ExcelModule.Style> = {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFDBDBDB' }
      },
      alignment: {
        wrapText: true,
        horizontal: 'left',
        vertical: 'top'
      }
    }
    const contentCenterStyle: Partial<ExcelModule.Style> = {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFDBDBDB' }
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'middle'
      }
    }

    const sheet = workbook.addWorksheet(user.username, { views: [{ showGridLines: false }] })
    sheet.getColumn(1).width = 2
    sheet.getColumn(2).width = 25
    sheet.getColumn(3).width = 50
    sheet.getColumn(4).width = 18
    sheet.getColumn(5).width = 15
    sheet.getColumn(6).width = 15
    sheet.getColumn(7).width = 11

    sheet.getColumn(2).alignment = { horizontal: 'left', vertical: 'middle' }
    sheet.getColumn(3).alignment = { wrapText: true, horizontal: 'left', vertical: 'middle' }

    sheet.mergeCells(2, 3, 2, 7)
    sheet.mergeCells(3, 3, 3, 7)
    sheet.mergeCells(4, 3, 4, 7)
    sheet.mergeCells(5, 3, 5, 7)

    const periodTitle = locale === LOCALES.BR ? 'Período' : 'Period'
    const periodDescription = locale === LOCALES.BR ? 'Fechamento de Ano' : 'End-Year'
    sheet.getRow(2).getCell(2).value = periodTitle
    sheet.getRow(2).getCell(3).value = periodDescription

    const yearTitle = locale === LOCALES.BR ? 'Ano' : 'Year'
    sheet.getRow(3).getCell(2).value = yearTitle
    sheet.getRow(3).getCell(3).value = evaluation.year

    const userNameTitle = locale === LOCALES.BR ? 'Nome do(a) Usuário(a)' : 'User Name'
    sheet.getRow(4).getCell(2).value = userNameTitle
    sheet.getRow(4).getCell(3).value = !user?.info
      ? user.username
      : `${user.info.name} ${user.info.lastname}`

    const managerTitle = locale === LOCALES.BR ? 'Nome do(a) Gestor(a)' : 'Manager Name'
    sheet.getRow(5).getCell(2).value = managerTitle
    sheet.getRow(5).getCell(3).value = !user?.manager
      ? ''
      : !user.manager?.info
      ? user?.manager.username
      : `${user.manager.info.name} ${user.manager.info.lastname}`

    /**
     * @PERFIL_DE_COMPETÊNCIAS
     */
    const skillsTitle = locale === LOCALES.BR ? 'PERFIL DE COMPETÊNCIAS' : 'SKILLS PROFILE'
    sheet.mergeCells(startRowCount, 2, startRowCount + questionsCount + skillsCount, 2)
    sheet.getCell(startRowCount, 2).value = skillsTitle

    sheet.getCell(startRowCount, 3).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startRowCount, 3).value = 'Item'
    sheet.mergeCells(startRowCount, 4, startRowCount, 6)
    sheet.getCell(startRowCount, 5).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startRowCount, 5).value = locale === LOCALES.BR ? 'Comentário' : 'Comment'
    sheet.getCell(startRowCount, 7).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startRowCount, 7).value = locale === LOCALES.BR ? 'Nota' : 'Rating'

    let startQuestionRowCount = startRowCount + 1
    questions.forEach((question) => {
      const performedQuestion = performed.questions.find((q) => q.question.id === question.id)
      sheet.mergeCells(startQuestionRowCount, 4, startQuestionRowCount, 6)
      sheet.getCell(startQuestionRowCount, 3).value = question.ask
      sheet.getCell(startQuestionRowCount, 4).value = performedQuestion?.reply ?? ''
      sheet.getCell(startQuestionRowCount, 4).style = contentJustifyStyle
      sheet.getCell(startQuestionRowCount, 7).style = contentCenterStyle
      startQuestionRowCount++
    })

    let startSkillRowCount = startQuestionRowCount
    skills.forEach((skill) => {
      const performedSkill = performed.skills.find((s) => s.skill.id === skill.id)
      sheet.mergeCells(startSkillRowCount, 4, startSkillRowCount, 6)
      sheet.getCell(startSkillRowCount, 3).value = skill.description

      sheet.getCell(startSkillRowCount, 4).value = performedSkill?.endFeedbackManager ?? ''
      sheet.getCell(startSkillRowCount, 4).style = contentJustifyStyle

      sheet.getCell(startSkillRowCount, 7).value = performedSkill?.ratingManager?.value ?? ''
      sheet.getCell(startSkillRowCount, 7).style = contentCenterStyle

      startSkillRowCount++
    })

    /**
     * @OBJETIVOS
     */
    const startGoalsRowCount = startRowCount + questionsCount + skillsCount + 1
    const endGoalsRowCount = startGoalsRowCount + (kpisCount || 1)

    const goalsTitle = locale === LOCALES.BR ? 'OBJETIVOS' : 'GOALS'
    sheet.mergeCells(startGoalsRowCount, 2, endGoalsRowCount, 2)
    sheet.getCell(startGoalsRowCount, 2).value = goalsTitle

    sheet.getCell(startGoalsRowCount, 3).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startGoalsRowCount, 3).value = 'Item'
    sheet.getCell(startGoalsRowCount, 4).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startGoalsRowCount, 4).value =
      locale === LOCALES.BR ? 'Meta do Ano' : 'Annual Goal'
    sheet.getCell(startGoalsRowCount, 5).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startGoalsRowCount, 5).value = 'KPI'
    sheet.getCell(startGoalsRowCount, 6).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startGoalsRowCount, 6).value =
      locale === LOCALES.BR ? 'Performance Alcançada' : 'Achieved Performance'
    sheet.getCell(startGoalsRowCount, 7).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(startGoalsRowCount, 7).value = locale === LOCALES.BR ? 'Nota' : 'Rating'

    let startGoalRowCount = startGoalsRowCount + 1
    evaluationGoals.forEach((goal) => {
      const performedGoal = performed.goals.find((g) => g.goal.id === goal.id)

      if (goal?.kpis.length > 1) {
        sheet.mergeCells(startGoalRowCount, 3, startGoalRowCount + goal.kpis.length - 1, 3)
      }
      sheet.getCell(startGoalRowCount, 3).value = goal.name

      if (!goal?.kpis.length) {
        sheet.getCell(startGoalRowCount, 4).value = ''
        sheet.getCell(startGoalRowCount, 4).style = contentJustifyStyle
        sheet.getCell(startGoalRowCount, 5).value = ''
        sheet.getCell(startGoalRowCount, 5).style = contentJustifyStyle
        sheet.getCell(startGoalRowCount, 6).value = ''
        sheet.getCell(startGoalRowCount, 6).style = contentJustifyStyle
        sheet.getCell(startGoalRowCount, 7).value = ''
        sheet.getCell(startGoalRowCount, 7).style = contentCenterStyle
      } else {
        goal?.kpis.forEach((kpi) => {
          const performedKpi = performedGoal?.performedKpis.find((k) => k.kpi.id === kpi.id)
          sheet.getCell(startGoalRowCount, 4).value = kpi?.target ?? ''
          sheet.getCell(startGoalRowCount, 4).style = contentJustifyStyle

          sheet.getCell(startGoalRowCount, 5).value = kpi?.name ?? ''
          sheet.getCell(startGoalRowCount, 5).style = contentJustifyStyle

          sheet.getCell(startGoalRowCount, 6).value = performedKpi?.achieved ?? ''
          sheet.getCell(startGoalRowCount, 6).style = contentJustifyStyle

          sheet.getCell(startGoalRowCount, 7).value = performedKpi?.ratingManager?.value ?? ''
          sheet.getCell(startGoalRowCount, 7).style = contentCenterStyle

          if (goal?.kpis.length > 1) {
            startGoalRowCount++
          }
        })
      }
      startGoalRowCount++
    })

    if (!evaluationGoals.length) {
      sheet.getCell(startGoalRowCount, 3).value = ''
      sheet.getCell(startGoalRowCount, 4).value = ''
      sheet.getCell(startGoalRowCount, 4).style = contentJustifyStyle
      sheet.getCell(startGoalRowCount, 5).value = ''
      sheet.getCell(startGoalRowCount, 5).style = contentJustifyStyle
      sheet.getCell(startGoalRowCount, 6).value = ''
      sheet.getCell(startGoalRowCount, 6).style = contentJustifyStyle
      sheet.getCell(startGoalRowCount, 7).value = ''
      sheet.getCell(startGoalRowCount, 7).style = contentCenterStyle
    }

    /**
     * @FEEDBACK_COMPLEMENTAR
     */
    const startFeedbacksRowCount = Math.max(endGoalsRowCount + 1, 0)
    const endFeedbacksRowCount = startFeedbacksRowCount + Math.max(feedbacksCount - 1, 0)
    sheet.mergeCells(startFeedbacksRowCount, 2, endFeedbacksRowCount, 2)
    const feedbackTitle = locale === LOCALES.BR ? 'FEEDBACK COMPLEMENTAR' : 'ADDITIONAL FEEDBACK'
    sheet.getCell(startFeedbacksRowCount, 2).value = feedbackTitle

    let startFeedbackRowCount = startFeedbacksRowCount
    feedbacks.forEach((feedback) => {
      const performedFeedback = performed.feedbacks.find((f) => f.feedback.id === feedback.id)
      sheet.getCell(startFeedbackRowCount, 3).value = feedback.inquire
      sheet.mergeCells(startFeedbackRowCount, 4, startFeedbackRowCount, 7)
      sheet.getCell(startFeedbackRowCount, 4).value = performedFeedback?.endReply || ''
      sheet.getCell(startFeedbackRowCount, 4).style = contentJustifyStyle
      startFeedbackRowCount++
    })

    /**
     * @PDI
     */
    const startPdiRowCount = endFeedbacksRowCount + 1
    const endPdiRowCount = startPdiRowCount + pdiCount
    sheet.mergeCells(startPdiRowCount, 2, endPdiRowCount - 1, 2)
    sheet.getCell(startPdiRowCount, 2).value = 'PDI'

    let pdiQualityRowCount = startPdiRowCount
    if (pdiStrengthCount > 1) {
      sheet.mergeCells(pdiQualityRowCount, 3, pdiQualityRowCount + pdiStrength.length - 1, 3)
    }
    const pdiStrengthTitle = locale === LOCALES.BR ? 'Pontos Fortes' : 'Strong Points'
    sheet.getCell(pdiQualityRowCount, 3).value = pdiStrengthTitle

    pdiStrength.forEach((strength) => {
      sheet.mergeCells(pdiQualityRowCount, 4, pdiQualityRowCount, 7)
      sheet.getCell(pdiQualityRowCount, 4).value = strength?.description || ''
      sheet.getCell(pdiQualityRowCount, 4).style = contentCenterStyle
      pdiQualityRowCount++
    })
    if (!pdiStrength.length) {
      sheet.mergeCells(pdiQualityRowCount, 4, pdiQualityRowCount, 7)
      sheet.getCell(pdiQualityRowCount, 4).value = ''
      sheet.getCell(pdiQualityRowCount, 4).style = contentCenterStyle
      pdiQualityRowCount++
    }

    if (pdiWeaknessCount > 1) {
      sheet.mergeCells(pdiQualityRowCount, 3, pdiQualityRowCount + pdiWeakness.length - 1, 3)
    }
    const pdiWeaknessTitle =
      locale === LOCALES.BR ? 'Áreas a serem desenvolvidas' : 'Competences to be developed'
    sheet.getCell(pdiQualityRowCount, 3).value = pdiWeaknessTitle

    pdiWeakness.forEach((weakness) => {
      sheet.mergeCells(pdiQualityRowCount, 4, pdiQualityRowCount, 7)
      sheet.getCell(pdiQualityRowCount, 4).value = weakness?.description || ''
      sheet.getCell(pdiQualityRowCount, 4).style = contentCenterStyle
      pdiQualityRowCount++
    })
    if (!pdiWeakness.length) {
      sheet.mergeCells(pdiQualityRowCount, 4, pdiQualityRowCount, 7)
      sheet.getCell(pdiQualityRowCount, 4).value = ''
      sheet.getCell(pdiQualityRowCount, 4).style = contentCenterStyle
      pdiQualityRowCount++
    }

    let pdiCompetenceRowCount = pdiQualityRowCount
    sheet.mergeCells(pdiCompetenceRowCount, 3, pdiCompetenceRowCount + pdiCompetenceCount, 3)
    const competenceTitle =
      locale === LOCALES.BR ? 'Desenvolvimento de Competências' : 'Competency Development'
    sheet.getCell(pdiCompetenceRowCount, 3).value = competenceTitle
    sheet.getCell(pdiCompetenceRowCount, 4).value =
      locale === LOCALES.BR ? 'Descrição' : 'Description'
    sheet.getCell(pdiCompetenceRowCount, 4).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(pdiCompetenceRowCount, 5).value = locale === LOCALES.BR ? 'Categoria' : 'Category'
    sheet.getCell(pdiCompetenceRowCount, 5).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(pdiCompetenceRowCount, 6).value = locale === LOCALES.BR ? 'Ação' : 'Action'
    sheet.getCell(pdiCompetenceRowCount, 6).alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell(pdiCompetenceRowCount, 7).value = locale === LOCALES.BR ? 'Prazo' : 'Deadline'
    sheet.getCell(pdiCompetenceRowCount, 7).alignment = { horizontal: 'center', vertical: 'middle' }

    ++pdiCompetenceRowCount
    pdiCompetence.forEach((competence) => {
      sheet.getCell(pdiCompetenceRowCount, 4).value = competence?.name || ''
      sheet.getCell(pdiCompetenceRowCount, 4).style = contentCenterStyle
      sheet.getCell(pdiCompetenceRowCount, 5).value = competence?.category.name || ''
      sheet.getCell(pdiCompetenceRowCount, 5).style = contentCenterStyle
      sheet.getCell(pdiCompetenceRowCount, 6).value = competence?.action || ''
      sheet.getCell(pdiCompetenceRowCount, 6).style = contentCenterStyle
      sheet.getCell(pdiCompetenceRowCount, 7).value =
        competence?.deadline.toLocaleDateString() || ''
      sheet.getCell(pdiCompetenceRowCount, 7).style = contentCenterStyle
      pdiCompetenceRowCount++
    })
    if (!pdiCompetence.length) {
      sheet.getCell(pdiCompetenceRowCount, 4).value = ''
      sheet.getCell(pdiCompetenceRowCount, 4).style = contentCenterStyle
      sheet.getCell(pdiCompetenceRowCount, 5).value = ''
      sheet.getCell(pdiCompetenceRowCount, 5).style = contentCenterStyle
      sheet.getCell(pdiCompetenceRowCount, 6).value = ''
      sheet.getCell(pdiCompetenceRowCount, 6).style = contentCenterStyle
      sheet.getCell(pdiCompetenceRowCount, 7).value = ''
      sheet.getCell(pdiCompetenceRowCount, 7).style = contentCenterStyle
      pdiCompetenceRowCount++
    }
    let pdiCoachingRowCount = pdiCompetenceRowCount
    if (pdiCoachingCount > 1) {
      sheet.mergeCells(pdiCoachingRowCount, 3, pdiCoachingRowCount + pdiCoachingCount - 1, 3)
    }
    const pdiCoachingTitle = locale === LOCALES.BR ? 'Coaching de Carreira' : 'Career Coaching'
    sheet.getCell(pdiCoachingRowCount, 3).value = pdiCoachingTitle
    pdiCoaching.forEach((coaching) => {
      sheet.mergeCells(pdiCoachingRowCount, 4, pdiCoachingRowCount, 7)
      sheet.getCell(pdiCoachingRowCount, 4).value = coaching.action || ''
      sheet.getCell(pdiCoachingRowCount, 4).style = contentCenterStyle
      pdiCoachingRowCount++
    })
    if (!pdiCoaching.length) {
      sheet.mergeCells(pdiCoachingRowCount, 4, pdiCoachingRowCount, 7)
      sheet.getCell(pdiCoachingRowCount, 4).value = ''
      sheet.getCell(pdiCoachingRowCount, 4).style = contentCenterStyle
      pdiCoachingRowCount++
    }

    /**
     * @NOTA_FINAL
     */
    const finalRatingRow = endPdiRowCount
    const finalRatingCellTitle = sheet.getCell(finalRatingRow, 2)
    finalRatingCellTitle.style = { font: { bold: true } }
    finalRatingCellTitle.value = locale === LOCALES.BR ? 'NOTA FINAL' : 'FINAL RATING'
    sheet.mergeCells(finalRatingRow, 3, finalRatingRow, 7)
    const finalRatingCell = sheet.getCell(finalRatingRow, 3)
    finalRatingCell.style = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'middle' }
    }
    const notRatedTitle = locale === LOCALES.BR ? 'Sem nota atribuída' : 'Not rated'
    finalRatingCell.value = performed.grade || notRatedTitle

    /**
     * @SET_BORDER
     */
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })
  }
}
