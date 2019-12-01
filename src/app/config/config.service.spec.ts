import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';

import { ConfigService, EnvironmentConfig } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();
    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail with an invalid config', async () => {
    const invalidEnvironment: EnvironmentConfig = { NODE_ENV: 'invalid' };
    expect(() =>
      (service as any).validateInput(invalidEnvironment),
    ).toThrowWithMessage(Error, /^Config validation error:/);
  });

  it('should be able to read a .env file', () => {
    const filePath = 'sample.env';
    if (fs.existsSync(filePath)) {
      expect((service as any).readEnvironmentFromFile(filePath)).toBeObject();
    }
  });

  describe('should expose configuration properties', () => {
    it('should check for dev environment', () => {
      expect(service.isDevelopmentEnvironment).toBeFalse();
    });

    it('should check for production environment', () => {
      expect(service.isProductionEnvironment).toBeFalse();
    });

    it('should check for test environment', () => {
      expect(service.isTestEnvironment).toBeTrue();
    });

    it('should expose a port number', () => {
      expect(service.port).toBeNumber();
    });
  });
});
