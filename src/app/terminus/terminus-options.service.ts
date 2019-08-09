import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  public constructor(private readonly dns: DNSHealthIndicator) {}

  public createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async (): Promise<HealthIndicatorResult> =>
          this.dns.pingCheck('google', 'https://www.google.com'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
