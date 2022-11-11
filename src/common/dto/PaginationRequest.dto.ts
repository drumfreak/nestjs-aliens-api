import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumberString, IsOptional } from 'class-validator';
import { searchFields } from '../constants';

export class PaginationRequestDto {
  @ApiProperty({
    name: 'skip',
    title: 'Skip',
    description: 'Number of items to skip in the pagination cursor',
    example: 0,
    default: 0,
    required: false,
  })
  @ApiPropertyOptional()
  skip?: number;

  @ApiProperty({
    name: 'take',
    title: 'Take',
    description: 'Number of items to retrieve in the pagination cursor',
    example: 10,
    required: false,
  })
  @ApiPropertyOptional()
  take?: number;

  @ApiProperty({
    name: 'orderField',
    title: 'Order Field',
    description: 'Order of the items in the pagination cursor by this field',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @ApiPropertyOptional()
  orderField?: string;

  @ApiProperty({
    name: 'order',
    title: 'Order',
    description: 'Order direction of the items in the pagination cursor',
    example: 'ASC',
    default: 'ASC',
    type: 'string',
  })
  @IsOptional()
  @ApiPropertyOptional()
  order?: 'ASC' | 'DESC';

  @ApiProperty({
    name: 'keywords',
    title: 'Keywords',
    description: 'Search query for the items in the pagination cursor',
  })
  @ApiPropertyOptional()
  @IsOptional()
  keywords?: string;

  @ApiProperty({
    name: 'searchFields',
    title: 'Search Fields',
    description:
      'Search these fields based on search string for the items in the pagination cursor',
    isArray: true,
    type: searchFields,
    enum: searchFields,
    default: null,
    example: ['id', 'name'],
  })
  @ApiPropertyOptional()
  @IsOptional()
  searchFields?: string;

  @ApiProperty({
    name: 'filter',
    title: 'Filter',
    description: 'Filter query for the items in the pagination cursor',
    example: {
      firstName: 'John',
      lastName: 'Doe',
    },
  })
  @IsOptional()
  filter?: any;
}
