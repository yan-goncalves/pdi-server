import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdatePerformedSkillInput } from '@performed-skills/dto/update-performed-skill.input'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePerformedSkillInput extends UpdatePerformedSkillInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idSkill: number
}
