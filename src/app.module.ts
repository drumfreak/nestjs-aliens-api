import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SpaceModule } from './modules/space/space.module';
import { EarthModule } from './modules/earth/earth.module';
import { AbductionsModule } from './modules/abductions/abductions.module';
const optionalModules = [];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    SpaceModule,
    EarthModule,
    AbductionsModule,
    ...optionalModules,
    HealthModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class NestSampleApiModule {}
