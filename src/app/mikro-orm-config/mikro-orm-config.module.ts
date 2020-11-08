import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmConfigService } from './mikro-orm-config.service';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';
import config from './mikro-orm.config';
import { MikroOrmMiddleware } from './mikro-orm.middleware';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(config)],
      providers: [MikroOrmLocalStorage],
      useClass: MikroOrmConfigService,
    }),
  ],
  providers: [MikroOrmLocalStorage, MikroOrmMiddleware],
})
export class MikroOrmConfigModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}