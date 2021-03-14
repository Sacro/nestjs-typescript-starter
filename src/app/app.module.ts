import { Logger } from '@mikro-orm/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { MikroOrmConfig, MikroOrmModule } from './mikro-orm';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [MikroOrmConfig],
    }),
    MikroOrmModule,
    HealthModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [Logger],
})
export class AppModule {}
