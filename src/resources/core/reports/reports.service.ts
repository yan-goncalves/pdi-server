import { UsersService } from '@core/users/users.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReportsService {
  constructor(private readonly usersService: UsersService) {}
}
