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
  AliensListRequestDTO,
  AliensSearchRequestDTO,
  AlienCreateRequestDTO,
  AlienGetByIdRequestDTO,
  AlienPatchRequestDTO,
} from '../dto';
import { AliensService } from '../services';

@Controller('api/v1/aliens')
@ApiTags('Alien Controller')
@ApiBearerAuth()
export class AliensController {
  constructor(private readonly service: AliensService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a Alien' })
  async create(@Body() body: AlienCreateRequestDTO) {
    return this.service.save(body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List Aliens' })
  async list(@Query() query: AliensListRequestDTO) {
    return this.service.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a Alien by Id' })
  async getById(@Param() params: AlienGetByIdRequestDTO) {
    const c = await this.service.getById(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Alien by Id' })
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() body: AlienPatchRequestDTO,
    @Param() params: AlienGetByIdRequestDTO,
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
  @ApiOperation({ summary: 'Aliens Database Search' })
  @UseGuards(JwtAuthGuard)
  async search(@Body() body: AliensSearchRequestDTO) {
    return this.service.search(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Alien by Id' })
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param() params: AlienGetByIdRequestDTO) {
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
