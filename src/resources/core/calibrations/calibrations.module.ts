import { EvaluationApprovalsModule } from '@evaluation-approvals/evaluation-approvals.module'
import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { CalibrationsResolver } from './calibrations.resolver'
import { CalibrationsService } from './calibrations.service'
import { CalibrationModel } from './entities/calibration.entity'
import { UsersModule } from '@core/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([CalibrationModel]),
    forwardRef(() => PerformedEvaluationsModule),
    forwardRef(() => EvaluationApprovalsModule),
    UsersModule
  ],
  providers: [CalibrationsService, CalibrationsResolver],
  exports: [CalibrationsService]
})
export class CalibrationsModule {}

