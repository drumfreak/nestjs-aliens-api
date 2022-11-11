import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { AbductionsHealthService } from '../services';

@Controller('api/v1/abductions')
@ApiTags('AbductionsHealth Controller')
@ApiBearerAuth()
export class AbductionsHealthController {
  constructor(
    private readonly abductionsHealthService: AbductionsHealthService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Get Health' })
  @UseGuards(JwtAuthGuard)
  async health() {
    return this.abductionsHealthService.health();
  }
  catch(error: any) {
    return {
      status: 'fail',
      data: null,
      message: error.message,
    };
  }
}
