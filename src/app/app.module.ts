import { Logger } from '@mikro-orm/core';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { MikroOrmConfigModule } from './mikro-orm-config/mikro-orm-config.module';

@Module({
  imports: [MikroOrmConfigModule, TerminusModule],
  controllers: [HealthController],
  providers: [Logger],
})
export class AppModule {}
