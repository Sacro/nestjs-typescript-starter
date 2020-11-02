import { Logger } from '@mikro-orm/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { MikroOrmConfigModule } from './mikro-orm-config/mikro-orm-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'production', 'test', 'provision')
      //     .default('production')
      //     .optional(),
      //   PORT: Joi.number().default(3000).optional(),
      // }).options({
      //   stripUnknown: true,
      // }),
    }),
    MikroOrmConfigModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [Logger],
})
export class AppModule {}
