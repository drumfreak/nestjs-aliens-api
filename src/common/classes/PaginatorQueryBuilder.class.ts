import { Like } from 'typeorm';
import { PaginationRequestDto } from '../dto';

export default class PaginatorQueryBuilder {
  public buildQuery(body: PaginationRequestDto, alias?: string) {
    const where: any = {};
    const take = Number(body.take) || 10;
    const skip = Number(body.skip) || 0;
    let order: any = {};
    if (body.orderField) {
      const orderPrefix = body.orderField.includes('.') ? '' : `${alias}.`;
      order[orderPrefix + body.orderField] = body.order;
    } else {
      order = { [`${alias}.createdAt`]: 'DESC' };
    }
    const orWhere = [];
    if (body.keywords && body.keywords !== '' && !body.searchFields) {
      orWhere[`${alias}.name`] = Like(`%${body.keywords}%`);
      orWhere[`${alias}.description`] = Like(`%${body.keywords}%`);
    } else if (body.keywords && body.keywords !== '') {
      let searchFields = body.searchFields.split(',');
      searchFields = searchFields.map((field) => {
        return `${field}`;
      });
      searchFields.forEach((field: any) => {
        orWhere.push({
          [field]: Like(`%${body.keywords}%`),
        });
      });
    }

    let filter: any;
    if (body.filter) {
      try {
        const tmp = JSON.parse(JSON.stringify(body.filter));
        filter = tmp
          .split('&')
          .map((item: any) => item.split('='))
          .reduce((acc: any, item: any) => {
            if (!isNaN(Number(item[1]))) {
              acc[item[0]] = Number(item[1]);
            } else {
              acc[item[0]] = item[1];
            }

            return acc;
          }, {});
      } catch (error: any) {
        console.warn('Error', error);
      }
    }
    // console.log('Where', where);
    // console.log('OrWhere', orWhere);
    // console.log('Order', order);
    // console.log('Filter', filter);
    return { where, take, skip, order, orWhere, filter };
  }
}
