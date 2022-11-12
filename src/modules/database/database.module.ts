import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from '../../config/mysql.datasource';
import { UserRole, User } from './entities/users';
import { mysqlProvider } from './providers/mysql.provider';
import { Alien } from './entities/aliens';
import { Human } from './entities/humans';
import { Location } from './entities/locations';
import { Abduction } from './entities/abductions';
import { Spaceship } from './entities/spaceships';
import { Planet } from './entities/planets';
const optionalEntities = [];
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      ...mysqlConfig,
      entities: [
        User,
        UserRole,
        Alien,
        Human,
        Location,
        Abduction,
        Spaceship,
        Planet,
        ...optionalEntities,
        ,
        ,
      ],
    }),
  ],
  providers: [...mysqlProvider],
  exports: [...mysqlProvider, TypeOrmModule],
})
export class DatabaseModule {}
