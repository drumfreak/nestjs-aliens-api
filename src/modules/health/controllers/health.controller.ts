import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthFailResponseDto, HealthSuccessResponseDto } from '../dto';
import { HealthService } from '../services';

@Controller('api/v1/health')
@ApiTags('Health Controller')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get()
  @ApiOperation({
    summary: 'Check Health',
    description: 'Checks the database connection and returns Ok if successful',
  })
  @ApiResponse({
    status: 200,
    description: 'Checks the database connection and returns Ok if successful',
    type: HealthSuccessResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Database connection failed',
    type: HealthFailResponseDto,
  })
  async checkHealth(): Promise<any> {
    return this.healthService.checkHealth();
  }
}
