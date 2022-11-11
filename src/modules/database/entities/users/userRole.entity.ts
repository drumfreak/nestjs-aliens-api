import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    title: 'Id',
    description: 'The id of the role',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @ApiProperty({
    name: 'name',
    title: 'Role Name',
    description: 'The name of the role',
  })
  name: string;

  @ApiProperty({
    name: 'users',
    title: 'Users',
    description: 'Users of the role',
    isArray: true,
    type: User,
  })
  @OneToMany(() => User, (user) => user.userRole, {
    eager: false,
    cascade: true,
  })
  users: User[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    name: 'createdAt',
    description: 'The date the role was created',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    name: 'updatedAt',
    description: 'The date the role was updated',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  @ApiProperty({
    name: 'deletedAt',
    description: 'The date the role was soft deleted',
  })
  deletedAt?: Date;
}
