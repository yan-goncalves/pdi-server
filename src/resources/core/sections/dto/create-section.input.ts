import { Field, InputType } from '@nestjs/graphql'
import { VisibilitySectionInput } from '@sections/dto/visibility-section.input'
import { VisibilityModel } from '@sections/entities/section.entity'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateSectionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string

  @Field(() => VisibilitySectionInput)
  @IsNotEmpty()
  visibility: VisibilityModel
}
