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
  SpaceshipsListRequestDTO,
  SpaceshipsSearchRequestDTO,
  SpaceshipCreateRequestDTO,
  SpaceshipGetByIdRequestDTO,
  SpaceshipPatchRequestDTO,
} from '../dto';
import { SpaceshipsService } from '../services';

@Controller('api/v1/spaceships')
@ApiTags('Spaceship Controller')
@ApiBearerAuth()
export class SpaceshipsController {
  constructor(private readonly service: SpaceshipsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a Spaceship' })
  async create(@Body() body: SpaceshipCreateRequestDTO) {
    return this.service.save(body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List Spaceships' })
  async list(@Query() query: SpaceshipsListRequestDTO) {
    return this.service.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a Spaceship by Id' })
  async getById(@Param() params: SpaceshipGetByIdRequestDTO) {
    const c = await this.service.getById(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Spaceship by Id' })
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() body: SpaceshipPatchRequestDTO,
    @Param() params: SpaceshipGetByIdRequestDTO,
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
  @ApiOperation({ summary: 'Spaceships Database Search' })
  @UseGuards(JwtAuthGuard)
  async search(@Body() body: SpaceshipsSearchRequestDTO) {
    return this.service.search(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Spaceship by Id' })
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param() params: SpaceshipGetByIdRequestDTO) {
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
