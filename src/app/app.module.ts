import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from './config/config.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule,
    TerminusModule,
    // TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
