import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    name: 'status',
    description: 'Status of the request',
    example: 'fail',
  })
  status: string;

  @ApiProperty({
    name: 'message',
    description: 'Message of the request',
    example: 'Item not found',
  })
  message: string;
}
