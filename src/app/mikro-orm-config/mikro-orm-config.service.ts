import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  public constructor(private readonly localStorage: MikroOrmLocalStorage) {}

  createMikroOrmOptions(): MikroOrmModuleOptions<IDatabaseDriver<Connection>> {
    return {
      type: 'postgresql',
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      clientUrl: 'postgresql://postgres:sHWSphW9M@postgres-postgresql',
      autoLoadEntities: true,
      registerRequestContext: false,
      context: () => this.localStorage.storage.getStore(),
    };
  }
}
