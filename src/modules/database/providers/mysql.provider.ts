import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserRole, User } from '../entities/users';
const optionalEntities = []; // Leave this for the template engine to replace

export const mysqlProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.NEST_MYSQL_HOST,
        port: Number(process.env.NEST_MYSQL_PORT),
        username: process.env.NEST_MYSQL_USER,
        password: process.env.NEST_MYSQL_PASSWORD,
        database: process.env.NEST_MYSQL_DATABASE,
        synchronize: false,
        logging: process.env.TYPEORM_LOGGING === 'true',
        migrationsTableName: 'migrations',
        migrations: ['../migrations/*{.ts,.js}'],
        migrationsRun: process.env.TYPEORM_MIGRATIONS === 'true',
        entities: [UserRole, User, ...optionalEntities],
      });
      return dataSource.initialize();
    },
  },
];
