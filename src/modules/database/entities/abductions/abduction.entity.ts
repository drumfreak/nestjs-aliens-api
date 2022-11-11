import { Transform } from 'class-transformer';
import { IsJSON } from 'class-validator';
import { IsOptional, IsBoolean } from 'class-validator';
import { Human } from '../humans';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
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

@Entity('abductions')
export class Abduction {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    description: 'Id of the Abductions',
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
    description: 'Name of the Abductions',
    example: 'Abduction example',
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
    description: 'Description of the Abductions',
    example: 'Abduction example',
    default: null,
    type: 'string',
    format: 'text',
  })
  description?: string;

  // Inserted on 2022-11-11T23:15:10.390Z
  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  @ApiProperty({
    name: 'abductionDate',
    title: 'Abduction Date Date',
    description: 'The abduction date date of the item',
    example: 'Abduction Date example',
    type: 'date',
    required: false,
    default: null,
  })
  @IsDateString()
  abductionDate?: Date;
  // Inserted

  // Inserted on 2022-11-11T23:12:56.665Z
  @ApiProperty({
    name: 'aliens',
    title: 'Aliens',
    description: 'Aliens',
    type: [Alien],
  })
  @ManyToMany(() => Alien, (aliens) => aliens.abductions, {
    cascade: ['insert', 'update'],
    // onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  aliens?: Alien[];
  // Inserted

  // Inserted on 2022-11-11T23:15:40.916Z
  @Column({
    type: 'boolean',
    default: false,
  })
  @ApiProperty({
    name: 'didItHurt',
    title: 'Did It Hurt',
    description: 'The did it hurt of the item',
    example: 'Did It Hurt example',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value ?? false)
  didItHurt?: boolean;
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

  // Inserted on 2022-11-11T23:14:14.393Z
  @ApiProperty({
    name: 'humans',
    title: 'Humans',
    description: 'Humans',
    type: [Human],
  })
  @ManyToMany(() => Human, (humans) => humans.abductions, {
    cascade: ['insert', 'update'],
    // onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  humans?: Human[];
  // Inserted

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
