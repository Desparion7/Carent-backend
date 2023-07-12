import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  ValidationError,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          { message: 'Validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173', 'https://carent-jade.vercel.app'],
    }),
  );
  await app.listen(3000);
}
bootstrap();
