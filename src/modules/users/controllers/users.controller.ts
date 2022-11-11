import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetByIdRequestDto, PaginationRequestDto } from '../../../common/dto';
import { CreateUserDto } from '../../users/dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { UsersService } from '../services';

@Controller('api/v1/users')
@ApiTags('Users Controller')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a User' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.findOrCreate(body);
  }

  @Get('/list')
  @ApiOperation({ summary: 'List Users' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUsers(@Query() body: PaginationRequestDto) {
    return this.usersService.getUsers(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a User By Id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserById(@Param() params: GetByIdRequestDto) {
    try {
      const c = await this.usersService.getUserById(params.id);
      if (c) {
        return {
          status: 'success',
          data: c,
        };
      }
    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error.message,
      };
    }
  }

  @Patch('update/settings')
  @ApiOperation({
    summary: 'Update User Settings',
    description: 'Receives user settings and identifies user by auth token',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateUserSettings(@Req() req: Request, @Body() body: any) {
    try {
      if (!req.user) throw new Error('User not found');
      const user: any = req.user;
      const c1: any = await this.usersService.getUserById(user.userId);
      if (c1) {
        c1.userSettings = body.userSettings;
      }
      const c: any = await this.usersService.save(c1);
      if (c) {
        return {
          status: 'success',
          data: c,
        };
      }
    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error.message,
      };
    }
  }
}
