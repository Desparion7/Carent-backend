import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173', 'https://carent-jade.vercel.app'],
    }),
  );
  await app.listen(3000);
}
bootstrap();
