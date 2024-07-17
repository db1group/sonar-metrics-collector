import './infra/otel/otel-setup';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Health Sync')
    .setDescription('The health sync API description')
    .setVersion('1.0')
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
