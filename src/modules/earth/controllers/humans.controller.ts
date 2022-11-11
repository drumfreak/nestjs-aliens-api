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
  HumansListRequestDTO,
  HumansSearchRequestDTO,
  HumanCreateRequestDTO,
  HumanGetByIdRequestDTO,
  HumanPatchRequestDTO,
} from '../dto';
import { HumansService } from '../services';

@Controller('api/v1/humans')
@ApiTags('Human Controller')
@ApiBearerAuth()
export class HumansController {
  constructor(private readonly service: HumansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a Human' })
  async create(@Body() body: HumanCreateRequestDTO) {
    return this.service.save(body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List Humans' })
  async list(@Query() query: HumansListRequestDTO) {
    return this.service.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a Human by Id' })
  async getById(@Param() params: HumanGetByIdRequestDTO) {
    const c = await this.service.getById(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Human by Id' })
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() body: HumanPatchRequestDTO,
    @Param() params: HumanGetByIdRequestDTO,
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
  @ApiOperation({ summary: 'Humans Database Search' })
  @UseGuards(JwtAuthGuard)
  async search(@Body() body: HumansSearchRequestDTO) {
    return this.service.search(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Human by Id' })
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param() params: HumanGetByIdRequestDTO) {
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
