import { Dictionary, IPrimaryKey } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger, NotFoundException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as util from 'util';

export const MikroOrmBaseConfig = (): MikroOrmModuleOptions => {
  return {
    type: 'postgresql' as const,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    dbName: process.env.POSTGRES_DB || 'postgres',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    autoLoadEntities: false,
    cache: {
      options: {
        cacheDir: '.cache',
      },
    },
    debug: process.env.NODE_ENV === 'development',
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    findOneOrFailHandler: (
      entityName: string,
      where: Dictionary | IPrimaryKey,
    ): Error => {
      return new NotFoundException(
        `Failed: ${entityName} in ${util.inspect(where)}`,
      );
    },
    logger: (message: unknown) => Logger.debug(message),
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
      path: 'migrations',
    },
    registerRequestContext: false,
  };
};

export const MikroOrmEntityConfig = (): MikroOrmModuleOptions => ({
  ...MikroOrmBaseConfig(),
  entities: ['./dist/entities/*.entity.js'],
  entitiesTs: ['./src/entities/*.entity.ts'],
});

export const MikroOrmConfig = registerAs('mikro-orm', MikroOrmBaseConfig);
