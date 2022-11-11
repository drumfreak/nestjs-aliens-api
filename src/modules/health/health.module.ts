import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthService } from './services';
import { HealthController } from './controllers';
import { usersProviders } from '../users/providers';

@Module({
  imports: [DatabaseModule, TypeOrmModule],
  controllers: [HealthController],
  providers: [HealthService, ...usersProviders],
  exports: [],
})
export class HealthModule {}
