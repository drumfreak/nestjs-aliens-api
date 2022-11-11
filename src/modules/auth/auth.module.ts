import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local.strategy';
import { jwtConstants } from './constants/auth.constants';
import { JwtStrategy } from './guards/jwt.strategy';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from '../users/providers/users.provider';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...usersProviders],
})
export class AuthModule {}
