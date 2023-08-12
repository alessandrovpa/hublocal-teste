import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Api HubLocal Teste')
  .setDescription(
    'Api desenvolvida por Alessandro Victor para realizar o teste de novos devs da HubLocal',
  )
  .setVersion('1.0')
  .addTag('user')
  .addTag('auth')
  .addTag('company')
  .addTag('address')
  .build();
