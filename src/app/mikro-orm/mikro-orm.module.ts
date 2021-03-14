import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule as MikroOrmBaseModule } from '@mikro-orm/nestjs';
import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmConfigService } from './mikro-orm-config.service';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';
import { MikroOrmConfig } from './mikro-orm.config';
import { MikroORMHealthIndicator } from './mikro-orm.health';

@Module({
  imports: [
    MikroOrmBaseModule.forRootAsync({
      useClass: MikroOrmConfigService,
      imports: [ConfigModule.forFeature(MikroOrmConfig)],
      providers: [MikroOrmLocalStorage],
    }),
  ],
  providers: [MikroORMHealthIndicator],
  exports: [MikroORMHealthIndicator],
})
export class MikroOrmModule implements OnApplicationShutdown {
  constructor(private orm: MikroORM) {}

  async onApplicationShutdown(): Promise<void> {
    Logger.log('closing ORM connection');
    await this.orm.close(true);
  }
}
