import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import {
  PlanetsListRequestDTO,
  PlanetsSearchRequestDTO,
  PlanetCreateRequestDTO,
  PlanetGetByIdRequestDTO,
  PlanetPatchRequestDTO,
} from '../dto';
import { PlanetsService } from '../services';

@Controller('api/v1/planets')
@ApiTags('Planet Controller')
@ApiBearerAuth()
export class PlanetsController {
  constructor(private readonly service: PlanetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a Planet' })
  async create(@Body() body: PlanetCreateRequestDTO) {
    return this.service.save(body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List Planets' })
  async list(@Query() query: PlanetsListRequestDTO) {
    return this.service.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a Planet by Id' })
  async getById(@Param() params: PlanetGetByIdRequestDTO) {
    const c = await this.service.getById(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Planet by Id' })
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() body: PlanetPatchRequestDTO,
    @Param() params: PlanetGetByIdRequestDTO,
  ) {
    const c = await this.service.update(params.id, body);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Post('/search')
  @ApiOperation({ summary: 'Planets Database Search' })
  @UseGuards(JwtAuthGuard)
  async search(@Body() body: PlanetsSearchRequestDTO) {
    return this.service.search(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Planet by Id' })
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param() params: PlanetGetByIdRequestDTO) {
    const c = await this.service.remove(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  catch(error: any) {
    return {
      status: 'fail',
      data: null,
      message: error.message,
    };
  }
}
