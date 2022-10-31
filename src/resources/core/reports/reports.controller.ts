import { Controller } from '@nestjs/common'
import { ReportsService } from './reports.service'

@Controller('report')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}
}
