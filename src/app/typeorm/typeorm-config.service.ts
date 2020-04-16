import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeormLoggerService } from './typeorm-logger.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      entities:
        this.config.get('NODE_ENV') === 'production'
          ? ['dist/**/**.entity{.ts,.js}']
          : ['src/**/**.entity{.ts,.js}'],
      logging:
        this.config.get('NODE_ENV') === 'development' ? 'all' : ['error'],
      logger: new TypeormLoggerService(),
      maxQueryExecutionTime: 1000,
      synchronize: false,
    };
  }
}
