import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';
import { TypeormLoggerService } from './typeorm-logger.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.config.postgres,
      entities: this.config.isProductionEnvironment
        ? ['dist/**/**.entity{.ts,.js}']
        : ['src/**/**.entity{.ts,.js}'],
      logging: this.config.isDevelopmentEnvironment ? 'all' : ['error'],
      logger: new TypeormLoggerService(),
      maxQueryExecutionTime: 1000,
      synchronize: false,
    };
  }
}
