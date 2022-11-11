import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { EarthHealthService } from '../services';

@Controller('api/v1/earth')
@ApiTags('EarthHealth Controller')
@ApiBearerAuth()
export class EarthHealthController {
  constructor(private readonly earthHealthService: EarthHealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Get Health' })
  @UseGuards(JwtAuthGuard)
  async health() {
    return this.earthHealthService.health();
  }
  catch(error: any) {
    return {
      status: 'fail',
      data: null,
      message: error.message,
    };
  }
}
