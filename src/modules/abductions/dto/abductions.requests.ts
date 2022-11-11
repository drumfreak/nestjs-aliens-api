import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Abduction } from '../../database/entities/abductions';
import { PaginationRequestDto } from '../../../common/dto';

export class AbductionGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the abduction to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
export class AbductionCreateRequestDTO extends PartialType(
  OmitType(Abduction, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class AbductionPatchRequestDTO extends PartialType(
  OmitType(Abduction, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class AbductionsSearchRequestDTO {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for abduction',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}

export class AbductionsListRequestDTO extends PartialType(
  OmitType(PaginationRequestDto, [] as const),
) {}
