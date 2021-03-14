import { MikroORM } from '@mikro-orm/core';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';

@Injectable()
export class MikroOrmMiddleware implements NestMiddleware {
  constructor(
    private readonly orm: MikroORM,
    private readonly localStorage: MikroOrmLocalStorage,
  ) {}

  async use(
    _req: Request,
    _res: Response,
    next: (...args: unknown[]) => void,
  ): Promise<void> {
    this.localStorage.storage.run(this.orm.em.fork(true, true), next);
  }
}
