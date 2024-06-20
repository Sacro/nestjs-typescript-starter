import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MikroORMHealthIndicator, MikroOrmModule } from '../mikro-orm';
import { HealthController } from './health.controller';

@Module({
  imports: [/*MikroOrmModule,*/ TerminusModule],
  // providers: [MikroORMHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
