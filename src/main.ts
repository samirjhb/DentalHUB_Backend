import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Manejador de Version Url
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  //Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(' Creacion de Api para DentalHub')
    .setDescription('Api para hacer peticiones POST, GET, GET/:ID y PATCH')
    .setVersion('1.0')
    .addTag('Registro de paciente')
    .addTag('Evaluación y diagnóstico')
    .addTag('Plan de tratamiento')
    .addTag('Tratamiento')
    .addTag('Registro y seguimiento')
    .addTag('Facturacion')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  //Puerto en el cual escucha
  await app.listen(3000);
}
bootstrap();
