import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmConfigService } from './mikro-orm-config.service';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';
import { beforeEach, describe, expect, it } from 'vitest';

describe('MikroOrmConfigService', () => {
  let service: MikroOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MikroOrmConfigService,
        {
          provide: MikroOrmLocalStorage,
          useValue: () => ({}),
        },
        {
          provide: MikroOrmConfigService,
          useValue: () => ({}),
        },
      ],
    }).compile();

    service = module.get<MikroOrmConfigService>(MikroOrmConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
