import { Module } from '@nestjs/common';
import { MikroORMHealthIndicator, MikroOrmModule } from '../mikro-orm';
import { HealthController } from './health.controller';

@Module({
  imports: [MikroOrmModule],
  providers: [MikroORMHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
