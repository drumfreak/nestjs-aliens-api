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
  LocationsListRequestDTO,
  LocationsSearchRequestDTO,
  LocationCreateRequestDTO,
  LocationGetByIdRequestDTO,
  LocationPatchRequestDTO,
} from '../dto';
import { LocationsService } from '../services';

@Controller('api/v1/locations')
@ApiTags('Location Controller')
@ApiBearerAuth()
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a Location' })
  async create(@Body() body: LocationCreateRequestDTO) {
    return this.service.save(body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List Locations' })
  async list(@Query() query: LocationsListRequestDTO) {
    return this.service.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a Location by Id' })
  async getById(@Param() params: LocationGetByIdRequestDTO) {
    const c = await this.service.getById(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Location by Id' })
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() body: LocationPatchRequestDTO,
    @Param() params: LocationGetByIdRequestDTO,
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
  @ApiOperation({ summary: 'Locations Database Search' })
  @UseGuards(JwtAuthGuard)
  async search(@Body() body: LocationsSearchRequestDTO) {
    return this.service.search(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Location by Id' })
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param() params: LocationGetByIdRequestDTO) {
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
