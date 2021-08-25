import { MikroOrmConfig } from './app/mikro-orm';

// eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
require('dotenv').config({ path: '.env' });

export default {
  ...MikroOrmConfig(),
};
