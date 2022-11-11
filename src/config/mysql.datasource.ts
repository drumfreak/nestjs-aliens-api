import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as chalk from 'chalk';

export const mysqlConfig: any = {
  type: 'mysql',
  host: process.env.NEST_MYSQL_HOST,
  port: Number(process.env.NEST_MYSQL_PORT),
  username: process.env.NEST_MYSQL_USER,
  password: process.env.NEST_MYSQL_PASSWORD,
  database: process.env.NEST_MYSQL_DATABASE,
  entities: [__dirname + '/../modules/database/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../modules/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const MySQLDataSource = new DataSource(mysqlConfig);

MySQLDataSource.initialize()
  .then(() => {
    console.log(
      chalk.yellow(
        'MySQL Data Source has been initialized!',
        mysqlConfig.host,
        mysqlConfig.port,
      ),
    );
  })
  .catch((err) => {
    console.error('Error during MySQL Data Source initialization', err);
  });

export default MySQLDataSource;
