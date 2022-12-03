import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ['http://localhost:4200'];
  app.enableCors({
    origin: whitelist,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
