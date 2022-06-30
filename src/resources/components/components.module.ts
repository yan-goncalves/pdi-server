import { ButtonModule } from '@components/button/button.module'
import { TextFieldModule } from '@components/text-field/text-field.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [ButtonModule, TextFieldModule]
})
export class ComponentsModule {}
