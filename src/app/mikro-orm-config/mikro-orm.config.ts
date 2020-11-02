import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'mikro-orm',
  (): MikroOrmModuleOptions<IDatabaseDriver<Connection>> => ({
    type: 'postgresql',
    clientUrl: 'postgresql://postgres:T4GuaWdW48@postgres-postgresql',
    autoLoadEntities: true,
  }),
);
