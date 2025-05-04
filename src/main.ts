import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Desactivamos el bodyParser predeterminado para configurarlo manualmente
  });

  // Configurar límites de tamaño para las solicitudes
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  //Version Url Handler
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  //Config global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

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
    .addTag('Whatsapp')
    .addTag('Ficha clínica')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  //Port on which it listens
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
