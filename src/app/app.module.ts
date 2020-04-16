import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('production')
          .optional(),

        PORT: Joi.number().default(3000).optional(),
      }).options({
        stripUnknown: true,
      }),
    }),
    TerminusModule,
    // TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
