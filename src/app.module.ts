import { Module } from '@nestjs/common';
import { UserModule } from './application/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager'
import { RoomModule } from './application/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: 'memory',
        ttl: 1000 * 60 * 5,
      }),
    }),
    UserModule,
    RoomModule
  ]
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}