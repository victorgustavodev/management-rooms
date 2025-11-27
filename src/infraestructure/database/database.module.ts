// database.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isTestEnv = config.get('NODE_ENV') === 'test'
        const isProd = config.get('NODE_ENV') === 'production'

        return {
          type: 'postgres',
          host: config.get(isTestEnv ? 'DB_HOST_TEST' : 'DB_HOST'),
          port: Number(config.get(isTestEnv ? 'DB_PORT_TEST' : 'DB_PORT')),
          username: config.get(isTestEnv ? 'DB_USERNAME_TEST' : 'DB_USERNAME'),
          password: config.get(isTestEnv ? 'DB_PASSWORD_TEST' : 'DB_PASSWORD'),
          database: config.get(isTestEnv ? 'DB_NAME_TEST' : 'DB_NAME'),
          entities: [__dirname + '/typeorm/entities/*.entity{.ts,.js}'],
          synchronize: !isProd,
          logging: config.get('DB_LOGGING') === 'true',
          autoLoadEntities: true
        }
      }
    })
  ]
})
export class DatabaseModule {}
