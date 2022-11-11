import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { PaginationRequestDto } from '../../../../common/dto';

export class AbductionsGetByIdRequestDTO {
  @ApiProperty({
    description: 'Id of the AbductionsPASCAL to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}

export class AbductionsSearchRequestDTO extends PaginationRequestDto {
  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Keywords for Abductions',
    example: 'test',
    default: 'test',
    required: true,
    type: String,
  })
  keywords?: string;
}
