import { Logger } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import {
  MikroOrmConfigService,
  MikroOrmLocalStorage,
  MikroOrmMiddleware,
} from './mikro-orm-config';

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
    MikroOrmModule.forRootAsync({
      providers: [MikroOrmLocalStorage],
      useClass: MikroOrmConfigService,
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [Logger, MikroOrmLocalStorage],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
