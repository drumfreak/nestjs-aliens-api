import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../database/entities/users';

export class AuthLoginDto {
  @ApiProperty({
    name: 'email',
    title: 'Email',
    description: 'The email of the user',
    example: 'admin@nestbuilder.io',
    type: 'email',
  })
  username: string;

  @ApiProperty({
    name: 'password',
    title: 'Password',
    description: 'The password of the user',
    example: 'nestbuilder',
    type: 'string',
  })
  @IsNotEmpty()
  password: string;
}

export class AuthUserResponse extends PartialType(
  OmitType(User, ['password', 'passwordTemporary', 'userResetToken'] as const),
) {}

export class AuthLoginResponseDto {
  @ApiProperty({
    name: 'status',
    description: 'Status of the login',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    name: 'user',
    description: 'The authenticated user object',
    type: AuthUserResponse,
  })
  user: AuthUserResponse;

  @ApiProperty({
    name: 'token',
    description: 'The JWT token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6ImFkbWluQG5lc3RidWlsZGVyLmlvIiwicm9sZSI6MSwiaWF0IjoxNjY1MDA1NjM4LCJleHAiOjE2NjUxNzg0Mzh9.3NR78VN6THZpohbBFskTbNpRal-7tHtAEqU9aG6_pYE',
  })
  token: string;

  @ApiProperty({
    name: 'tokenDuration',
    description: 'The length the token is valid for',
    example: 86400000,
  })
  tokenDuration: number;

  @ApiProperty({
    name: 'tokenIssued',
    description: 'The date the token was issued',
    example: '2022-10-10T20:00:38.000Z',
  })
  tokenIssued: Date;

  @ApiProperty({
    name: 'tokenExpires',
    description: 'The date the token expires',
    example: '2022-10-10T20:00:38.000Z',
  })
  tokenExpires: Date;
}
