import { DataSource } from 'typeorm';

const source = new DataSource({
  type: 'sqlite',
  database: 'db',
  entities: ['src/**/entities/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/**/*{.js,.ts}'],
});

export default source;
