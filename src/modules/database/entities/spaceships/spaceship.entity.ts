import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { IsOptional } from 'class-validator';
import { IsNumberString } from 'class-validator';
import { Alien } from '../aliens';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('spaceships')
export class Spaceship {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    description: 'Id of the Spaceships',
    example: 1,
    default: 1,
    type: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'name',
    title: 'Name',
    description: 'Name of the Spaceships',
    example: 'Spaceship example',
    default: null,
    type: 'string',
    format: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'description',
    title: 'Description',
    description: 'Description of the Spaceships',
    example: 'Spaceship example',
    default: null,
    type: 'string',
    format: 'text',
  })
  description?: string;

  // Inserted on 2022-11-11T23:35:12.639Z
  @ApiProperty({
    name: 'aliens',
    title: 'Aliens',
    description: 'Aliens',
    // isArray: true,
    type: [Alien],
  })
  @OneToMany(() => Alien, (alien) => alien.spaceship, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  aliens?: Alien[];

  // Inserted

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    name: 'createdAt',
    title: 'Created At',
    description: 'Created at date',
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
    description: 'Updated at date',
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
    description: 'Soft Deleted at date',
    example: '2022-10-10',
    default: '2022-10-10',
    type: 'date',
  })
  @IsDateString()
  deletedAt?: Date;
}
