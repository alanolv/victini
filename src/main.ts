import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
   const logger = new Logger('Main-Victini');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/');
 
  await app.listen(envs.port);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  logger.log(`Application is running on PORT: ${envs.port}`);
}
bootstrap();
