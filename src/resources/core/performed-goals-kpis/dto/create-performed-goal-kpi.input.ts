import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/update-performed-goal-kpi.input'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePerformedGoalKpiInput extends UpdatePerformedGoalKpiInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformedGoal: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idKpi: number
}
