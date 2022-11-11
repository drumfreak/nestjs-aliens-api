import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRole } from '../../database/entities/users';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<UserRole>,
  ) {}

  async checkHealth() {
    try {
      await this.roleRepository.count();
      return {
        status: 'Ok',
      };
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException(
        error,
        'Database connection failed',
      );
    }
  }
}
