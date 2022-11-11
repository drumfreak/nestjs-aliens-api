import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as ms from 'ms';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities/users';
import 'dotenv/config';

const loginErrorObject = {
  status: 'fail',
  message: 'credentials failed',
};

@Injectable({})
export class AuthService {
  jwtSecret = process.env.JWT_SECRET;
  jwtExpires = process.env.JWT_EXPIRES;
  ms = ms;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    // console.log('PASSWORD IS');
    // const p = bcrypt.hashSync('nestbuilder', bcrypt.genSaltSync(8));
    // console.log(p);
  }

  async getLoggedIn(req: any) {
    try {
      if (!req.user) {
        return {
          status: 'success',
          user: {},
        };
      }
      try {
        const c: any = await this.usersRepository.findOne({
          where: { email: req.user.userEmail },
        });
        if (c) {
          const token = this.jwtService.sign({
            userId: c.id,
            userEmail: c.email,
            role: c.userRole,
          });
          return {
            status: 'success',
            user: this.sanitizeUser(c),
            token,
            tokenDuration: this.ms(this.jwtExpires),
            tokenIssued: new Date(),
            tokenExpires: new Date(
              new Date().getTime() + this.ms(this.jwtExpires),
            ),
          };
        } else {
          return loginErrorObject;
        }
      } catch (err) {
        this.logger.debug(err);
        return {
          status: 'fail',
          message: err.message,
        };
      }
    } catch (err) {
      return {
        status: 'fail',
        user: {},
      };
    }
  }

  sanitizeUser = (user: any) => {
    delete user.password;
    delete user.passwordTemporary;
    delete user.userResetToken;
    return user;
  };

  async validateUser(username: string, password: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === password) {
    //     const {password, ...result} = user
    //     return result
    // }
    return null;
  }

  async login(postData: any) {
    try {
      const c: any = await this.usersRepository.findOne({
        where: { email: postData.email },
      });
      if (c) {
        if (!bcrypt.compareSync(postData.password, c.password)) {
          return loginErrorObject;
        }
        const token = this.jwtService.sign({
          userId: c.id,
          userEmail: c.email,
          role: c.userRole,
        });
        return {
          status: 'success',
          user: this.sanitizeUser(c),
          token,
          tokenDuration: this.ms(this.jwtExpires),
          tokenIssued: new Date(),
          tokenExpires: new Date(
            new Date().getTime() + this.ms(this.jwtExpires),
          ),
        };
      } else {
        return loginErrorObject;
      }
    } catch (err) {
      this.logger.debug(err);
      return {
        status: 'fail',
        message: err.message,
      };
    }
  }
}
