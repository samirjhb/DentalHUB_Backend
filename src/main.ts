import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Version Url Handler
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
    .addTag('Registro de Paciente')
    .addTag('Evaluación y diagnóstico')
    .addTag('Plan de tratamiento')
    .addTag('Tratamiento')
    .addTag('Registro y seguimiento')
    .addTag('Facturacion')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  //Port on which it listens
  await app.listen(process.env.PORT);
}
bootstrap();
