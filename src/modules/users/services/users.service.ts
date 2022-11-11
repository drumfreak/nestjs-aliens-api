import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  exec = promisify(exec);

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: any) {
    const f: any = await this.userRepository
      .createQueryBuilder('users')
      .select('users.id')
      .addSelect('users.createdAt')
      .addSelect('users.updatedAt')
      .addSelect('users.deletedAt')
      .addSelect('users.email')
      .addSelect('users.firstName')
      .addSelect('users.lastName')
      .addSelect('users.forcePasswordChange')
      .addSelect('users.userSettings')
      .addSelect('users.userRoleId')
      .leftJoinAndSelect('users.userRole', 'role')
      .where({ id: id })
      .getOne();
    if (f) {
      const userSettings = f.userSettings;
      delete f.userSettings;
      return { ...f, userSettings: userSettings };
    } else {
      return null;
    }
  }

  async getUsers(body: any) {
    try {
      const where: any = {};
      const take = body.limit || 10;
      const skip = body.skip || 0;
      let order: any = {};

      if (body.sortKey) {
        order[body.sortKey] = body.sortType;
      } else {
        order = { ['users.createdAt']: 'DESC' };
      }

      const [f, count] = await this.userRepository
        .createQueryBuilder('users')
        //   .leftJoinAndSelect('users.roles', 'role')
        .select('users.id')
        .addSelect('users.createdAt')
        .addSelect('users.updatedAt')
        .addSelect('users.firstName')
        .addSelect('users.deletedAt')
        .addSelect('users.lastName')
        .addSelect('users.forcePasswordChange')
        .take(take)
        .skip(skip)
        .orderBy(order)
        .where(where)
        .getManyAndCount();
      return {
        status: 'success',
        data: { result: f ? f : [], totalCount: count },
      };
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException(error);
    }
  }

  async save(user: any) {
    try {
      const c = await this.userRepository.save(user);
      if (c) {
        const f: any = await this.getUserById(user.id);
        if (f) {
          return f;
        }
      }
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error);
    }
  }

  async removeUser(where: any) {
    try {
      const c: any = await this.userRepository.findOne(where);
      if (c) {
        const f: any = await this.userRepository.delete(where);
        if (f) {
          return f;
        } else {
          throw new NotFoundException('Not found');
        }
      }
    } catch (err) {
      this.logger.warn(err);
      throw new InternalServerErrorException(err);
    }
  }

  sanitizeUser = (user: any) => {
    delete user.password;
    delete user.passwordTemporary;
    delete user.userResetToken;
    return user;
  };

  async findOrCreate(c2: any) {
    try {
      // console.log(c2);
      const q = { email: c2.email };
      const f: any = await this.userRepository
        .createQueryBuilder('users')
        // .leftJoinAndSelect('volumes.containers', 'containers')
        .where(q)
        .getOne();
      if (f) {
        return {
          status: 'fail',
          message: 'User already exists. Try updating instead.',
          result: this.sanitizeUser(f),
        };
      } else {
        if (c2.password) {
          const p = bcrypt.hashSync(c2.password, bcrypt.genSaltSync(8));
          c2.password = p;
        }
        const f2: any = await this.userRepository.save({ ...c2 });
        const f: any = await this.getUserById(f2.id);
        if (f) {
          return { status: 'success', result: this.sanitizeUser(f) };
        } else {
          throw new InternalServerErrorException('Unable to create user');
        }
      }
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error);
    }
  }
}
