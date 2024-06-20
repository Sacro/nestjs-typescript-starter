import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmLocalStorage } from './mikro-orm-local-storage';
import { beforeEach, describe, expect, it } from 'vitest';

describe('MikroOrmLocalStorage', () => {
  let provider: MikroOrmLocalStorage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MikroOrmLocalStorage],
    }).compile();

    provider = module.get<MikroOrmLocalStorage>(MikroOrmLocalStorage);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
