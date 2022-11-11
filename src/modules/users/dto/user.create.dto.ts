import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../../database/entities/users';

export class CreateUserDto extends PartialType(
  OmitType(User, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'lastLoginDate',
    'passwordTemporary',
    'passwordTemporarySet',
    'userResetToken',
    'lastPasswordResetDate',
    'userSettings',
    'userRole',
  ] as const),
) {}
