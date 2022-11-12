import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Location } from '../../database/entities/locations';
import { PaginationRequestDto } from '../../../common/dto';

export class LocationGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the location to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
export class LocationCreateRequestDTO extends PartialType(
  OmitType(Location, [
    'id',
    'human',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ] as const),
) {}

export class LocationPatchRequestDTO extends PartialType(
  OmitType(Location, [
    'id',
    'human',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ] as const),
) {}

export class LocationsSearchRequestDTO {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for location',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}

export class LocationsListRequestDTO extends PartialType(
  OmitType(PaginationRequestDto, [] as const),
) {}
