import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { PaginationRequestDto } from '../../../../common/dto';

export class EarthGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the EarthPASCAL to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}

export class EarthSearchRequestDTO extends PaginationRequestDto {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for Earth',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}
