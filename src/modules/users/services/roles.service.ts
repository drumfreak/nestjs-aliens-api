import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRole } from '../../database/entities/users';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<UserRole>,
  ) {}

  async getRoles(body: any) {
    try {
      const where: any = {};
      const take = body.limit || 10;
      const skip = body.skip || 0;
      let order: any = {};

      if (body.sortKey) {
        order['roles.' + body.sortKey] = body.sortType;
      } else {
        order = { ['roles.createdAt']: 'DESC' };
      }

      const [f, count] = await this.roleRepository
        .createQueryBuilder('roles')
        .select('roles.id')
        .addSelect('roles.name')
        .addSelect('roles.createdAt')
        .addSelect('roles.updatedAt')
        .addSelect('roles.deletedAt')
        // .innerJoinAndSelect('roles.users', 'users')
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

  async save(role: any) {
    try {
      const c = await this.roleRepository.save(role);
      if (c) {
        const f: any = await this.getRoleById(role.id);
        if (f) {
          return f;
        }
      }
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOrCreate(c2: any) {
    try {
      console.log(c2);
      const q = { name: c2.name };
      const f: any = await this.roleRepository
        .createQueryBuilder('roles')
        // .leftJoinAndSelect('volumes.containers', 'containers')
        .where(q)
        .getOne();
      if (f) {
        return {
          status: 'fail',
          message: 'User Role already exists. Try updating instead.',
          result: f,
        };
      } else {
        const f2: any = await this.roleRepository.save({ ...c2 });
        console.log('F2', f2);
        if (f2) {
          return { status: 'success', result: f2 };
        } else {
          throw new InternalServerErrorException('Unable to create user role');
        }
      }
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getRoleById(id: any) {
    try {
      const f: any = await this.roleRepository
        .createQueryBuilder('role')
        .select('role.id')
        .addSelect('role.createdAt')
        .addSelect('role.updatedAt')
        .addSelect('role.deletedAt')
        .addSelect('role.name')
        // .innerJoin('role.users', 'users')
        // .addSelect('users.id')
        // .addSelect('users.firstName')
        // .addSelect('users.lastName')
        // .addSelect('users.email')
        // .addSelect('users.userRole')
        .where({ id: Number(id) })
        .getOne();
      console.log('F', f);
      if (f) {
        return f;
      } else {
        throw new NotFoundException('Unable to find user role');
      }
    } catch (error: any) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error);
    }
  }
}
