import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
@Injectable()
export class EarthHealthService {
  private readonly logger = new Logger(EarthHealthService.name);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async health() {
    try {
      return {
        status: 'success',
        code: 200,
        message: 'Ok',
        data: { result: 'Ok' },
      };
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error);
    }
  }
}
