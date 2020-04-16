import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import 'jest-extended';
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
    jest.spyOn(config, 'get').mockImplementation(() => 'development');
    const options = service.createTypeOrmOptions();

    expect(options.logging).toBe('all');
    expect(options.entities[0]).toStartWith('src');
  });

  it('should return a test config object', () => {
    jest.spyOn(config, 'get').mockImplementation(() => 'testing');
    const options = service.createTypeOrmOptions();

    expect(options.logging).toEqual(['error']);
    expect(options.entities[0]).toStartWith('src');
  });

  it('should return a production config object', () => {
    jest.spyOn(config, 'get').mockImplementation(() => 'production');

    const options = service.createTypeOrmOptions();

    expect(options.logging).toEqual(['error']);
    expect(options.entities[0]).toStartWith('dist');
  });
});
