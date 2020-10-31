import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmConfigService } from './mikro-orm-config.service';

describe('MikroOrmConfigService', () => {
  let service: MikroOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MikroOrmConfigService],
    }).compile();

    service = module.get<MikroOrmConfigService>(MikroOrmConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
