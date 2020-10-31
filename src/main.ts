import { NestFactory } from '@nestjs/core';
import { waitForDebugger } from 'inspector';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  if (process.env.DEBUG_BRK === 'true') {
    console.log('Waiting for debugger...');
    waitForDebugger();
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
