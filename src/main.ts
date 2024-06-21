import { NestFactory } from '@nestjs/core';
import { waitForDebugger } from 'inspector';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  if (process.env.DEBUG_BRK === 'true') {
    console.log('Waiting for debugger...');
    waitForDebugger();
  }

  let port = 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    Logger.log(`App listening on port ${port}`, 'NestApplication');
  });
}
bootstrap();
