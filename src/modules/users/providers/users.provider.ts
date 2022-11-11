import { DataSource } from 'typeorm';
import { UserRole, User } from '../../database/entities/users';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRole),
    inject: ['DATA_SOURCE'],
  },
];
