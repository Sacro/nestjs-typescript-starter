import {
  Connection,
  Dictionary,
  IDatabaseDriver,
  IPrimaryKey,
} from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as util from 'util';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';
import { MikroOrmConfig } from './mikro-orm.config';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  public constructor(
    @Inject(MikroOrmConfig.KEY)
    private config: ConfigType<typeof MikroOrmConfig>,
    private localStorage: MikroOrmLocalStorage,
  ) {}

  createMikroOrmOptions(): MikroOrmModuleOptions<IDatabaseDriver<Connection>> {
    return {
      type: 'postgresql' as const,
      host: this.config.host,
      dbName: this.config.database,
      user: this.config.user,
      password: this.config.password,

      autoLoadEntities: false,
      cache: {
        options: {
          cacheDir: '.cache',
        },
      },
      context: () => this.localStorage.storage.getStore(),
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
  }
}
