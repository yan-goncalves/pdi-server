import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'
import { KpiInput } from './kpi.input'

@InputType()
export class CreateKpiInput extends KpiInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idGoal: number
}
