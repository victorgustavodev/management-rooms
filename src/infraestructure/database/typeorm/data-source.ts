import 'dotenv/config'
import 'tsconfig-paths/register'
import { DataSource } from 'typeorm'

import { TypeormUserEntity } from './entities/typeorm-user.entity'

const isTest = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'e2e'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env[isTest ? 'DB_HOST_TEST' : 'DB_HOST'],
  port: Number(process.env[isTest ? 'DB_PORT_TEST' : 'DB_PORT'] || 5432),
  username: process.env[isTest ? 'DB_USERNAME_TEST' : 'DB_USERNAME'],
  password: process.env[isTest ? 'DB_PASSWORD_TEST' : 'DB_PASSWORD'],
  database: process.env[isTest ? 'DB_NAME_TEST' : 'DB_NAME'],
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [TypeormUserEntity]
  // migrations: ['src/infraestructure/database/typeorm/migrations/*.ts']
})

export default AppDataSource
