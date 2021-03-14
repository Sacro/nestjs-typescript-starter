import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { MikroORMHealthIndicator } from '../mikro-orm';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private orm: MikroORMHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthcheck() {
    return this.health.check([
      async () => this.http.pingCheck('google', 'https://google.com'),
      async () => this.orm.isHealthy('orm'),
    ]);
  }
}
