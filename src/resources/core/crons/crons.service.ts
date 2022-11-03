import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { readdirSync, unlinkSync } from 'fs'

@Injectable()
export class CronsService {
  @Cron('* 00 * * *')
  clearReportsPath(): void {
    const path = 'downloads/reports'
    readdirSync(path).map((file) => unlinkSync(`${path}/${file}`))
  }
}
