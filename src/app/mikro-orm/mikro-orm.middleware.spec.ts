import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmLocalStorage } from '.';

describe('MikroOrmMiddleware', () => {
  let service: MikroOrmMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MikroOrmMiddleware,
        {
          provide: MikroOrmLocalStorage,
          useValue: () => ({}),
        },
        {
          provide: MikroORM,
          useValue: () => ({}),
        },
      ],
    }).compile();

    service = module.get<MikroOrmMiddleware>(MikroOrmMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
