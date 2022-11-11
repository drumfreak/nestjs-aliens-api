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

@Entity('aliens')
export class Alien {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    name: 'id',
    description: 'Id of the Aliens',
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
    description: 'Name of the Aliens',
    example: 'Alien example',
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
    description: 'Description of the Aliens',
    example: 'Alien example',
    default: null,
    type: 'string',
    format: 'text',
  })
  description?: string;

  // Inserted on 2022-11-11T23:13:20.054Z
  @ApiProperty({
    name: 'abductions',
    title: 'Abductions',
    description: 'Abductions',
    type: [Abduction],
  })
  @ManyToMany(() => Abduction, (abductions) => abductions.aliens, {
    cascade: ['insert', 'update'],
    // onDelete: 'CASCADE',
    eager: false,
  })
  // @JoinTable()
  abductions?: Abduction[];

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
