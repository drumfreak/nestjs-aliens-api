import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthLoginDto, AuthLoginResponseDto } from '../dto';
import { AuthService } from '../services';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';

@Controller('api/v1/auth')
@ApiTags('Auth Controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'User Login',
    type: AuthLoginResponseDto,
  })
  async login(@Body() body: AuthLoginDto): Promise<any> {
    return this.authService.login(body);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'User Logout' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  logout(): string {
    return 'logout';
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check User Auth' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiBearerAuth()
  async loggedIn(@Req() req: Request) {
    return await this.authService.getLoggedIn(req);
  }

  //   @Post('forgotPassword')
  //   forgotPassword(@Req() req: Request): string {
  //     return 'forgotPassword';
  //   }

  //   @Post('resetPassword')
  //   resetPassword(@Req() req: Request): string {
  //     return 'resetPassword';
  //   }
}
