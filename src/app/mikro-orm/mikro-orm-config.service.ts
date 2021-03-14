import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';
import { MikroOrmConfig } from './mikro-orm.config';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  public constructor(
    @Inject(MikroOrmConfig.KEY)
    private databaseConfig: ConfigType<typeof MikroOrmConfig>,
    private localStorage: MikroOrmLocalStorage,
  ) {}

  createMikroOrmOptions(): MikroOrmModuleOptions<IDatabaseDriver<Connection>> {
    return {
      logger: Logger.log,
      context: () => this.localStorage.storage.getStore(),
      ...this.databaseConfig,
    };
  }
}
