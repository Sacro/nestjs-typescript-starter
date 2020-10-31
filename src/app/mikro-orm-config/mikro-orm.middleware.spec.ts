import { MikroOrmMiddleware } from './mikro-orm.middleware';

describe('MikroOrmMiddleware', () => {
  it('should be defined', () => {
    expect(new MikroOrmMiddleware()).toBeDefined();
  });
});
