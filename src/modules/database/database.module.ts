import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from '../../config/mysql.datasource';
import { UserRole, User } from './entities/users';
import { mysqlProvider } from './providers/mysql.provider';
const optionalEntities = [];

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      ...mysqlConfig,
      entities: [User, UserRole, ...optionalEntities],
    }),
  ],
  providers: [...mysqlProvider],
  exports: [...mysqlProvider, TypeOrmModule],
})
export class DatabaseModule {}
