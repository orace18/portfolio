import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const corsOrigin = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ?? [
    'http://localhost:4200',
  ];
  app.enableCors({ origin: corsOrigin });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Portfolio API démarrée sur http://localhost:${port}`);
}

bootstrap();
