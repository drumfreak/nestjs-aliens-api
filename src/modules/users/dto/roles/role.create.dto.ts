import { OmitType, PartialType } from '@nestjs/swagger';
import { UserRole } from '../../../database/entities/users';

export class CreateUserRoleDto extends PartialType(
  OmitType(UserRole, [
    'id',
    'users',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ] as const),
) {}
