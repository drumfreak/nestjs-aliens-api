import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { IsOptional } from 'class-validator';
import { IsNumberString } from 'class-validator';
import { Location } from '../locations';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
import { Abduction } from '../abductions';
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

@Entity('humans')
export class Human {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    description: 'Id of the Humans',
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
    name: 'firstName',
    title: 'First Name',
    description: 'First Name of the Humans',
    example: 'Hank',
    default: null,
    type: 'string',
    format: 'text',
  })
  firstName: string;

  // Inserted on 2022-11-11T23:41:12.858Z
  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
  })
  @ApiProperty({
    name: 'lastName',
    title: 'Last Name',
    description: 'The last name of the item',
    example: 'Last Name example',
  })
  @IsOptional()
  lastName?: string;
  // Inserted

  // Inserted on 2022-11-11T23:40:09.572Z
  @ApiProperty({
    name: 'locations',
    title: 'Locations',
    description: 'Locations',
    // isArray: true,
    type: [Location],
  })
  @OneToMany(() => Location, (location) => location.human, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  locations?: Location[];

  // Inserted

  @Column({
    type: 'text',
    unique: false,
    nullable: true,
  })
  @ApiProperty({
    name: 'description',
    title: 'Description',
    description: 'Description of the Humans',
    example: 'Human example',
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

  // Inserted on 2022-11-11T23:14:17.098Z
  @ApiProperty({
    name: 'abductions',
    title: 'Abductions',
    description: 'Abductions',
    type: [Abduction],
  })
  @ManyToMany(() => Abduction, (abductions) => abductions.humans, {
    cascade: ['insert', 'update'],
    // onDelete: 'CASCADE',
    eager: false,
  })
  // @JoinTable()
  abductions?: Abduction[];

  // Inserted

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
