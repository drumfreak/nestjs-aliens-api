import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { PaginationRequestDto } from '../../../../common/dto';

export class SpaceGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the SpacePASCAL to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}

export class SpaceSearchRequestDTO extends PaginationRequestDto {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for Space',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}
