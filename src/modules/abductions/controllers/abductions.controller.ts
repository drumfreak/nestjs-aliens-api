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
  AbductionsListRequestDTO,
  AbductionsSearchRequestDTO,
  AbductionCreateRequestDTO,
  AbductionGetByIdRequestDTO,
  AbductionPatchRequestDTO,
} from '../dto';
import { AbductionsService } from '../services';

@Controller('api/v1/abductions')
@ApiTags('Abduction Controller')
@ApiBearerAuth()
export class AbductionsController {
  constructor(private readonly service: AbductionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a Abduction' })
  async create(@Body() body: AbductionCreateRequestDTO) {
    return this.service.save(body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List Abductions' })
  async list(@Query() query: AbductionsListRequestDTO) {
    return this.service.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a Abduction by Id' })
  async getById(@Param() params: AbductionGetByIdRequestDTO) {
    const c = await this.service.getById(params.id);
    if (c) {
      return {
        status: 'success',
        data: c,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Abduction by Id' })
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() body: AbductionPatchRequestDTO,
    @Param() params: AbductionGetByIdRequestDTO,
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
  @ApiOperation({ summary: 'Abductions Database Search' })
  @UseGuards(JwtAuthGuard)
  async search(@Body() body: AbductionsSearchRequestDTO) {
    return this.service.search(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Abduction by Id' })
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param() params: AbductionGetByIdRequestDTO) {
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
