import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetByIdRequestDto {
  @ApiProperty({
    description: 'Id of the item to retrieve',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumberString()
  id?: number;
}
