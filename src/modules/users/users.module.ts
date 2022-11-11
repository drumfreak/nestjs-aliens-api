import { Module } from '@nestjs/common';
import { UsersController, RolesController } from './controllers';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './providers/users.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService, UsersService } from './services';

@Module({
  imports: [DatabaseModule, TypeOrmModule],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService, ...usersProviders],
  exports: [...usersProviders],
})
export class UsersModule {}
