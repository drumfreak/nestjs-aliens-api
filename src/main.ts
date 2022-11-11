import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeOptions } from './common/pipes/ValidationPipeOptions';
import { NestSampleApiModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

const conf: any = dotenv.config({ path: '.env' }).parsed;

async function bootstrap() {
  const app = await NestFactory.create(NestSampleApiModule, {
    cors: true,
  });

  // const configService = app.get(ConfigService);

  const pipeOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
    forbidUnknownValues: false,
    enableDebugMessages: true,
    validationError: {
      target: false,
    },
    skipMissingProperties: true,
    skipNullProperties: true,
  };

  app.useGlobalPipes(new ValidationPipe(pipeOptions));

  // Uncomment to password protect swagger
  // app.use(['/api/swagger'],
  //   basicAuth({
  //    challenge: true,
  //     users: {
  //      docs: 'nestbuilder',
  //     },
  //  }),
  // );

  const config = new DocumentBuilder()
    .setTitle('Aliens API')
    .setDescription('Aliens API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, {
    customSiteTitle: 'Aliens API',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  if (!fs.existsSync('dist/spec')) {
    fs.mkdirSync('dist/spec', { recursive: true });
  }

  fs.writeFileSync('dist/spec/aliens-api-spec.json', JSON.stringify(document));

  app.use(morgan('tiny'));

  await app.listen(Number(conf.NEST_PORT) || 5917);
  console.log(
    chalk.yellow(`\n\nNest Application is running on:`),
    chalk.blue(`${await app.getUrl()}/api`),
    chalk.yellow(`\nSwagger Application is running on:`),
    chalk.blue(`${await app.getUrl()}/api/swagger\n\n`),
  );
}
bootstrap();
