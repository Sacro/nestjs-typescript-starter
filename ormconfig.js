require('dotenv').parse('.env');

// tslint:disable:object-literal-sort-keys
module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/typeorm/migration/**/*.ts'],
  subscribers: ['src/typeorm/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/typeorm/entity',
    migrationsDir: 'src/typeorm/migration',
    subscribersDir: 'src/typeorm/subscriber',
  },
};
