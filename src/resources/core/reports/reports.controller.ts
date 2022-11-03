import { Body, Controller, Get, Param, Post, StreamableFile } from '@nestjs/common'
import { ReportDto } from './dto/report.dto'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  async generate(@Body() input: ReportDto): Promise<{ uuid: string }> {
    return await this.service.generate(input)
  }

  @Get(':uuid')
  async download(@Param('uuid') uuid: string): Promise<StreamableFile> {
    return await this.service.download(uuid)
  }
}
