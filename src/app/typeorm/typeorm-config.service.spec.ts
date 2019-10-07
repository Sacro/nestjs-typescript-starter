import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '../config/config.service';
import { TypeOrmConfigService } from './typeorm-config.service';

describe('TypeormConfigService', () => {
  let config: ConfigService;
  let service: TypeOrmConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, TypeOrmConfigService],
    }).compile();
    config = module.get<ConfigService>(ConfigService);
    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a dev config object', () => {
    jest
      .spyOn(config, 'isDevelopmentEnvironment', 'get')
      .mockImplementation(() => true);
    const options = service.createTypeOrmOptions();

    expect(options.logging).toBe('all');
    expect(options.entities[0]).toStartWith('src');
  });

  it('should return a test config object', () => {
    const options = service.createTypeOrmOptions();

    expect(options.logging).toEqual(['error']);
    expect(options.entities[0]).toStartWith('src');
  });

  it('should return a production config object', () => {
    jest
      .spyOn(config, 'isProductionEnvironment', 'get')
      .mockImplementation(() => true);

    const options = service.createTypeOrmOptions();

    expect(options.logging).toEqual(['error']);
    expect(options.entities[0]).toStartWith('dist');
  });
});
