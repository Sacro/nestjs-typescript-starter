import { MikroORM } from '@mikro-orm/core';
import {} from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class MikroORMHealthIndicator extends HealthIndicator {
  constructor(private readonly orm: MikroORM) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = await this.orm.isConnected();

    const result = this.getStatus(key, isHealthy);

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('MikroORM Healthcheck failed', result);
  }
}
