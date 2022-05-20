import { CreateButtonInput } from '@components/button/dto/create-button.input'
import { ButtonModel } from '@components/button/entities/button.entity'
import { MediaInput } from '@medias/dto/media.input'
import { MediaModel } from '@medias/entities/media.entity'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateHomeInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string

  @Field(() => MediaInput)
  @IsNotEmpty()
  hero: MediaModel

  @Field(() => CreateButtonInput)
  @IsNotEmpty()
  button: ButtonModel
}
