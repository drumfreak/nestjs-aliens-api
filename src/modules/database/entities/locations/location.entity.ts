import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { IsOptional } from 'class-validator';
import { IsNumberString } from 'class-validator';
import { Human } from '../humans';
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

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    description: 'Id of the Locations',
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
    description: 'Name of the Locations',
    example: 'Location example',
    default: null,
    type: 'string',
    format: 'text',
  })
  name: string;

  // Inserted on 2022-11-11T23:40:10.726Z
  @ApiProperty({
    name: 'human',
    title: 'Human',
    description: 'Human',
    type: Human,
  })
  @ManyToOne(() => Human, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn({ name: 'humanId' })
  human?: Human;

  @Column({ nullable: true })
  @ApiProperty({
    name: 'humanId',
    title: 'Human Id',
    description: 'Human Id',
    example: 1,
    default: 1,
    type: Number,
  })
  // @IsNumberString()
  humanId?: number;

  // Inserted

  @Column({
    type: 'text',
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'description',
    title: 'Description',
    description: 'Description of the Locations',
    example: 'Location example',
    default: null,
    type: 'string',
    format: 'text',
  })
  description?: string;

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
