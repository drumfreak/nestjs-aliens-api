import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Alien } from '../../database/entities/aliens';
import { PaginationRequestDto } from '../../../common/dto';

export class AlienGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the alien to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
export class AlienCreateRequestDTO extends PartialType(
  OmitType(Alien, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class AlienPatchRequestDTO extends PartialType(
  OmitType(Alien, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class AliensSearchRequestDTO {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for alien',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}

export class AliensListRequestDTO extends PartialType(
  OmitType(PaginationRequestDto, [] as const),
) {}
