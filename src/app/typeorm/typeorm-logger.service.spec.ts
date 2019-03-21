import 'jest-extended';

import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { TypeormLoggerService } from './typeorm-logger.service';

describe('TypeormLoggerService', () => {
  let service: TypeormLoggerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeormLoggerService],
    }).compile();
    service = module.get<TypeormLoggerService>(TypeormLoggerService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logQuery', () => {
    it('should be defined', () => {
      expect(service.logQuery).toBeDefined();
    });

    it('should call the logger', () => {
      const log = jest.spyOn(Logger, 'log').mockImplementation(() => {
        return;
      });

      service.logQuery('query');
      service.logQuery('query', ['params']);

      expect(log).toBeCalledTimes(2);
    });
  });

  describe('logQueryError', () => {
    it('should be defined', () => {
      expect(service.logQueryError).toBeDefined();
    });

    it('should call the logger', () => {
      const error = jest.spyOn(Logger, 'error').mockImplementation(() => {
        return;
      });

      service.logQueryError('error', 'query');
      service.logQueryError('error', 'query', ['params']);

      expect(error).toBeCalledTimes(2);
    });
  });

  describe('logQuerySlow', () => {
    it('should be defined', () => {
      expect(service.logQuerySlow).toBeDefined();
    });

    it('should call the logger', () => {
      const log = jest.spyOn(Logger, 'warn').mockImplementation(() => {
        return;
      });

      service.logQuerySlow(1, 'query');
      service.logQuerySlow(1, 'query', ['params']);

      expect(log).toBeCalledTimes(4); // Each logs two lines
    });
  });

  describe('logSchemaBuild', () => {
    it('should be defined', () => {
      expect(service.logSchemaBuild).toBeDefined();
    });

    it('should throw an Error', () => {
      expect(() => {
        service.logSchemaBuild('message');
      }).toThrowError();
    });
  });

  describe('logMigration', () => {
    it('should be defined', () => {
      expect(service.logMigration).toBeDefined();
    });

    it('should call the logger', () => {
      const log = jest.spyOn(Logger, 'log').mockImplementation(() => {
        return;
      });

      service.logMigration('message');

      expect(log).toBeCalledTimes(1);
    });
  });

  describe('log', () => {
    it('should be defined', () => {
      expect(service.log).toBeDefined();
    });

    it('should call the logger', () => {
      const log = jest.spyOn(Logger, 'log').mockImplementation(() => {
        return;
      });

      const warn = jest.spyOn(Logger, 'warn').mockImplementation(() => {
        return;
      });

      service.log('log', 'log message');
      service.log('info', 'info message');
      service.log('warn', 'warning message');

      expect(log).toBeCalledTimes(2);
      expect(warn).toBeCalledTimes(1);
    });
  });

  describe('stringifyParams', () => {
    it('should be defined', () => {
      expect((service as any).stringifyParams).toBeDefined();
    });

    it('should handle circular JSON', () => {
      const object = { arr: [], obj: {} };
      object.arr = [object, object];
      object.arr.push(object.arr);
      object.obj = object;

      expect((service as any).stringifyParams(object)).toEqual(object);
    });
  });
});
