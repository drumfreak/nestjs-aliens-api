import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import * as chalk from 'chalk';
@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    const statusCode = response.statusCode;
    this.logger.log(
      chalk.green(`[${method}]`) +
        chalk.yellow(`  ${statusCode}`) +
        chalk.white(`  ${url}`) +
        chalk.white(`  ${userAgent} ${ip}`),
    );

    next();
  }
}
