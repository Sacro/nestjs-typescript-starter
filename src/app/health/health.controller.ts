import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthcheck() {
    return this.health.check([
      async () => this.dns.pingCheck('google', 'https://google.com'),
    ]);
  }
}
