import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@infra/nestjs/modules/app.module';
import { swaggerConfig } from '@infra/nestjs/config/swagger';
import { GlobalExceptionHandler } from '@infra/nestjs/modules/errors/global-error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionHandler(app.get(HttpAdapterHost)));

  app.enableCors();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(3333);
}
bootstrap();
