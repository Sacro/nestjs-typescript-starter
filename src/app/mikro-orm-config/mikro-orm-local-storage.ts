import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class MikroOrmLocalStorage {
  readonly storage: AsyncLocalStorage<EntityManager>;

  constructor() {
    this.storage = new AsyncLocalStorage<EntityManager>();
  }
}
