import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Human } from '../../database/entities/humans';
import { PaginationRequestDto } from '../../../common/dto';

export class HumanGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the human to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
export class HumanCreateRequestDTO extends PartialType(
  OmitType(Human, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class HumanPatchRequestDTO extends PartialType(
  OmitType(Human, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const),
) {}

export class HumansSearchRequestDTO {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for human',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}

export class HumansListRequestDTO extends PartialType(
  OmitType(PaginationRequestDto, [] as const),
) {}
