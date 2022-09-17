import { DataSource } from 'typeorm'
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions'

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.TYPEORM_HOST || 'localhost',
  database: process.env.TYPEORM_DATABASE || 'PDI',
  username: process.env.TYPEORM_USERNAME || 'pdi',
  password: process.env.TYPEORM_PASSWORD || '1@asdfgPDI',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  requestTimeout: 60 * 1000,
  autoLoadEntities: true,
  options: {
    encrypt: false,
    enableArithAbort: true
  },
  logging: false,
  synchronize: process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
  migrations: [__dirname + '/migrations/*.{ts,js}']
} as SqlServerConnectionOptions)
