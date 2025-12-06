import { CurrentUser } from '@decorators/current-user.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import { CalibrationsService } from './calibrations.service'
import { CreateCalibrationInput } from './dto/create-calibration.input'
import { UpdateCalibrationInput } from './dto/update-calibration.input'
import { CalibrationModel } from './entities/calibration.entity'

@Resolver(() => CalibrationModel)
export class CalibrationsResolver {
  constructor(private readonly service: CalibrationsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => CalibrationModel, { nullable: true, name: 'calibration' })
  async get(
    @Args('idPerformedEvaluation', { type: () => Int }) idPerformedEvaluation: number
  ): Promise<CalibrationModel | null> {
    return await this.service.get(idPerformedEvaluation)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CalibrationModel)
  async createCalibration(
    @Args('input') input: CreateCalibrationInput,
    @CurrentUser() user: UserModel
  ): Promise<CalibrationModel> {
    return await this.service.create(input, user)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CalibrationModel)
  async updateCalibration(
    @Args('input') input: UpdateCalibrationInput,
    @CurrentUser() user: UserModel
  ): Promise<CalibrationModel> {
    return await this.service.update(input, user)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteCalibration(
    @Args('idPerformedEvaluation', { type: () => Int }) idPerformedEvaluation: number
  ): Promise<boolean> {
    return await this.service.delete(idPerformedEvaluation)
  }
}

