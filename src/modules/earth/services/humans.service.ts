import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import PaginatorQueryBuilder from '../../../common/classes/PaginatorQueryBuilder.class';
import { DataSource, Repository } from 'typeorm';
import { Human } from '../../database/entities/humans';
import { HumansListRequestDTO, HumanCreateRequestDTO } from '../dto';

@Injectable()
export class HumansService {
  private readonly logger = new Logger(HumansService.name);
  private repository: Repository<Human>;
  private paginatorQueryBuilder: PaginatorQueryBuilder =
    new PaginatorQueryBuilder();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.manager.getRepository(Human);
    this.paginatorQueryBuilder = new PaginatorQueryBuilder();
  }

  async getById(id: any) {
    try {
      const f: any = await this.repository.findOne({
        where: { id: Number(id) },
        relations: ['abductions'],
      });
      // OR use querybuilder:
      //  const f: any = await this.repository.createQueryBuilder('item')
      // .select('item.id')
      // .addSelect('item.id')
      // .addSelect('item.name')
      // .addSelect('item.createdAt')
      // .addSelect('item.updatedAt')
      // .leftJoin('item.relationship', 'item2')
      // .addSelect('item2.id')
      // .addSelect('item2.name')
      // or
      //.leftJoinAndSelect('item.relationship', 'item3')
      //.where({ id: Number(id) })
      //.getOne();
      if (f) {
        return f;
      } else {
        throw new NotFoundException('Unable to find Human');
      }
    } catch (error: any) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async save(item: HumanCreateRequestDTO) {
    try {
      const c = await this.repository.save(item);
      if (c) {
        const f: any = await this.getById(c.id);
        if (f) {
          return f;
        }
      }
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOrCreate(c2: any) {
    try {
      const q = { name: c2.id };
      const f: any = await this.repository
        .createQueryBuilder('item')
        .where(q)
        .getOne();
      if (f) {
        return {
          status: 'fail',
          message: 'Human already exists. Try updating instead.',
          result: f,
        };
      } else {
        const f2: any = await this.repository.save({ ...c2 });
        if (f2) {
          return { status: 'success', result: f2 };
        } else {
          throw new InternalServerErrorException('Unable to create human');
        }
      }
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: any, body: any) {
    try {
      const item: Human = await this.getById(id);
      if (item?.id) {
        const newItem: any = this.repository.merge({
          ...body,
          id: Number(id),
        });
        const f: any = await this.repository.save(newItem);
        if (f) {
          const f2: any = await this.getById(id);
          return f2;
        } else {
          throw new NotFoundException('Unable to find Human');
        }
      } else {
        throw new NotFoundException('Unable to find Human');
      }
    } catch (error: any) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async search(body: any) {
    try {
      console.log('Humans Search Body', body);
      return {
        status: 'success',
        data: { result: [], totalCount: 0 },
      };
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException(error);
    }
  }

  async list(body: HumansListRequestDTO) {
    try {
      const { where, order, orWhere, skip, take, filter } =
        this.paginatorQueryBuilder.buildQuery(body, 'items');

      const q: any = this.repository
        .createQueryBuilder('items')
        // .select('items.id')
        // .innerJoinAndSelect('templateFiles.users', 'users')
        .take(take)
        .skip(skip)
        .orderBy(order);

      let filtersActive = false;
      //   if (filter?.templateId) {
      //     q.andWhere('items.templateId = :templateId', {
      //       templateId: filter?.templateId,
      //     });
      //     filtersActive = true;
      //   }
      if (filter) {
        filtersActive = false;
      }
      if (!filtersActive) {
        if (where && !orWhere) {
          q.where(where);
        } else if (orWhere) {
          q.orWhere(orWhere);
          console.warn('where', orWhere);
        }
      }
      const [f, count] = await q.getManyAndCount();
      return {
        status: 'success',
        data: { result: f ? f : [], totalCount: count },
      };
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: any) {
    try {
      const f: any = await this.repository
        .createQueryBuilder('item')
        .delete()
        .where({ id: Number(id) })
        .execute();
      if (f) {
        return {
          status: 'success',
          data: { result: f },
          message: 'Human deleted',
        };
      } else {
        throw new NotFoundException('Unable to find human');
      }
    } catch (error: any) {
      this.logger.warn(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
