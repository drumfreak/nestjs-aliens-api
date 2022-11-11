import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetByIdRequestDto, PaginationRequestDto } from '../../../common/dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { CreateUserRoleDto } from '../dto/roles';
import { RolesService } from '../services';

@Controller('api/v1/roles')
@ApiTags('User Roles Controller')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a User Role' })
  @UseGuards(JwtAuthGuard)
  async createUserRole(@Body() body: CreateUserRoleDto) {
    return this.roleService.findOrCreate(body);
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List User Roles' })
  async getRoles(@Query() body: PaginationRequestDto) {
    return this.roleService.getRoles(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a User Role by Id' })
  @UseGuards(JwtAuthGuard)
  async getRoleById(@Param() params: GetByIdRequestDto) {
    const c = await this.roleService.getRoleById(params.id);
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
