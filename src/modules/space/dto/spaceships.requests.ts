import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Spaceship } from '../../database/entities/spaceships';
import { PaginationRequestDto } from '../../../common/dto';

export class SpaceshipGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the spaceship to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
export class SpaceshipCreateRequestDTO extends PartialType(
  OmitType(Spaceship, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class SpaceshipPatchRequestDTO extends PartialType(
  OmitType(Spaceship, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class SpaceshipsSearchRequestDTO {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for spaceship',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}

export class SpaceshipsListRequestDTO extends PartialType(
  OmitType(PaginationRequestDto, [] as const),
) {}
