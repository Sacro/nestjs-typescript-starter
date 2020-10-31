import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Sample {
  @PrimaryKey()
  id: number;
}
