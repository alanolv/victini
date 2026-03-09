import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
   const logger = new Logger('Main-Victini');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/');
 app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
 });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(envs.port);
  logger.log(`Server started on port ${envs.port}`);
}
bootstrap();
