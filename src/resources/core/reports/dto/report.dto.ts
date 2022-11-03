import { EvaluationModel } from '@core/evaluations/entities/evaluation.entity'
import { GoalModel } from '@core/goals/entities/goal.entity'
import { UserModel } from '@core/users/entities/user.entity'
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from 'class-validator'

export class ReportDto {
  @ArrayNotEmpty()
  @ValidateNested()
  users: UserModel[]

  @IsNotEmpty()
  @ValidateNested()
  evaluation: EvaluationModel

  @IsNotEmpty()
  @ValidateNested()
  usersEvaluationGoals: { [key in number]: GoalModel[] }
}
