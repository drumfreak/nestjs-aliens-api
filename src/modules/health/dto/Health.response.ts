import { ApiProperty } from '@nestjs/swagger';

export class HealthSuccessResponseDto {
  @ApiProperty({
    description: 'Status of the health check',
    example: 'Ok',
    default: 0,
  })
  status?: string;
}

export class HealthFailResponseDto {
  @ApiProperty({
    description: 'Failed Status of the health check',
    example: {
      errno: -61,
      code: 'ECONNREFUSED',
      syscall: 'connect',
      address: '127.0.0.1',
      port: 3306,
      fatal: true,
    },
  })
  status?: any;
}
