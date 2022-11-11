import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsJSON,
  IsNotEmpty,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './userRole.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    description: 'Id of the user',
    example: 1,
    default: 1,
    type: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @ApiProperty({
    name: 'email',
    title: 'Email',
    description: 'Email of the user',
    example: 'admin@nestbuilder.io',
    default: 'admin@nestbuilder.io',
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'firstName',
    title: 'First Name',
    description: 'First name of the user',
    example: 'John',
    default: 'John',
    type: 'string',
  })
  @IsNotEmpty()
  firstName?: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'lastName',
    title: 'Last Name',
    description: 'Last name of the user',
    example: 'Doe',
    default: 'Doe',
    type: 'string',
  })
  @IsNotEmpty()
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'password',
    title: 'Password',
    description: 'Password of the user',
    example: 'password',
    default: 'password',
    type: 'string',
  })
  @ApiHideProperty()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'passwordTemporary',
    title: 'Temporary Password',
    description: 'Temporary password of the user',
    example: 'password',
    default: 'password',
    type: 'string',
  })
  passwordTemporary?: string;

  @Column({ default: 0 })
  @ApiProperty({
    name: 'passwordTemporarySet',
    title: 'Temporary Password Set',
    description: 'Temporary password set of the user',
    example: true,
    default: false,
    type: Boolean,
  })
  passwordTemporarySet?: boolean;

  @Column({ default: 0 })
  @ApiProperty({
    name: 'forcePasswordChange',
    title: 'Force Password Change',
    description: 'Force password change of the user',
    example: true,
    default: true,
    type: Boolean,
  })
  @IsBoolean()
  forcePasswordChange?: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'userResetToken',
    title: 'User Reset Token',
    description: 'User reset token of the user',
    example: 'token',
    default: 'token',
    type: 'string',
  })
  userResetToken?: string;

  @Column({ nullable: true })
  @ApiProperty({
    name: 'lastPasswordResetDate',
    title: 'Last Password Reset Date',
    description: 'Last password reset date of the user',
    example: '2022-10-10',
    default: '2022-10-10',
    type: 'date',
  })
  @IsDateString()
  lastPasswordResetDate?: Date;

  @ApiProperty({
    name: 'userRole',
    title: 'User Role',
    description: 'User Role',
    type: UserRole,
    isArray: false,
  })
  @ManyToOne(() => UserRole, (role) => role.users, {
    eager: true,
    cascade: false,
  })
  @JoinColumn({ name: 'userRoleId', referencedColumnName: 'id' })
  userRole?: UserRole;

  @Column({ nullable: true })
  @ApiProperty({
    name: 'userRoleId',
    title: 'User Role Id',
    description: 'User Role Id',
    example: 1,
    default: 1,
    type: 'number',
  })
  userRoleId?: number;

  @Column({
    type: 'json',
    default: null,
    nullable: true,
  })
  @ApiProperty({
    name: 'userSettings',
    title: 'User Settings',
    description: 'User settings of the user',
    example: { setting1: 'value1', setting2: 'value2' },
    default: {},
    type: 'json',
  })
  @IsJSON()
  userSettings?: any = {};

  // add lastLoginDate column
  @Column({ nullable: true })
  @ApiProperty({
    name: 'lastLoginDate',
    title: 'Last Login Date',
    description: 'Last login date of the user',
    example: '2022-10-10',
    default: '2022-10-10',
    type: 'date',
  })
  @IsDateString()
  lastLoginDate?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    name: 'createdAt',
    title: 'Created At',
    description: 'Created at of the user',
    example: '2022-10-10',
    default: '2022-10-10',
    type: 'date',
  })
  @IsDateString()
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    name: 'updatedAt',
    title: 'Updated At',
    description: 'Updated at of the user',
    example: '2022-10-10',
    default: '2022-10-10',
    type: 'date',
  })
  @IsDateString()
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  @ApiProperty({
    name: 'deletedAt',
    title: 'Deleted At',
    description: 'Deleted date of the user',
    example: '2022-10-10',
    default: '2022-10-10',
    type: 'date',
  })
  @IsDateString()
  deletedAt?: Date;
}
