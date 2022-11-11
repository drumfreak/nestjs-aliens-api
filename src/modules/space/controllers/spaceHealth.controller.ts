import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { SpaceHealthService } from '../services';

@Controller('api/v1/space')
@ApiTags('SpaceHealth Controller')
@ApiBearerAuth()
export class SpaceHealthController {
  constructor(private readonly spaceHealthService: SpaceHealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Get Health' })
  @UseGuards(JwtAuthGuard)
  async health() {
    return this.spaceHealthService.health();
  }
  catch(error: any) {
    return {
      status: 'fail',
      data: null,
      message: error.message,
    };
  }
}
