import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Planet } from '../../database/entities/planets';
import { PaginationRequestDto } from '../../../common/dto';

export class PlanetGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the planet to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
export class PlanetCreateRequestDTO extends PartialType(
  OmitType(Planet, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class PlanetPatchRequestDTO extends PartialType(
  OmitType(Planet, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class PlanetsSearchRequestDTO {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for planet',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}

export class PlanetsListRequestDTO extends PartialType(
  OmitType(PaginationRequestDto, [] as const),
) {}
