import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { waitForDebugger } from 'inspector';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  if (process.env.DEBUG_BRK === 'true') {
    console.log('Waiting for debugger...');
    waitForDebugger();
  }

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? '3000');
}
bootstrap();
