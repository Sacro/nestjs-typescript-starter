import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';
import { TerminusOptionsService } from './terminus/terminus-options.service';
// import { TypeOrmConfigService } from './typeorm/typeorm-config.service';

@Module({
  imports: [
    ConfigModule,
    TerminusModule.forRootAsync({ useClass: TerminusOptionsService }),
    // TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
