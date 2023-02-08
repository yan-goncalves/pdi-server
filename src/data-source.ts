import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' })

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.TYPEORM_HOST || 'localhost\\MSSQLSERVER14',
  database: process.env.TYPEORM_DATABASE || 'PDI',
  username: process.env.TYPEORM_USERNAME || 'sa',
  password: process.env.TYPEORM_PASSWORD || '1@asdfgsa',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  requestTimeout: 60 * 1000,
  autoLoadEntities: true,
  options: {
    encrypt: false,
    enableArithAbort: true
  },
  logging: false,
  migrationsRun: false,
  migrations: [__dirname + '/migrations/*.{ts,js}']
} as SqlServerConnectionOptions)

export const AppDataSourceManager = AppDataSource.manager
