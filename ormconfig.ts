import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  synchronize: true,
  logging: false,
  entities: ['dist/entity/**/*.entity{.ts, .js}'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  // 에러
  //   cli: {
  //     entitiesDir: 'src/entity',
  //     migrationsDir: 'src/migration',
  //     subscribersDir: 'src/subscriber',
  //   },
};

export default ormconfig;
