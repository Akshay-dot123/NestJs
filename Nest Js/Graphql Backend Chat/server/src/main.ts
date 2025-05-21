// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      // 'http://localhost:3001',
      'http://localhost:5173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  // Swagger setup
  // const config = new DocumentBuilder()
  //   .setTitle('My NestJS API') // Title of your API
  //   .setDescription('API description') // Description
  //   .setVersion('1.0') // Version of the API
  //   .build();

  // // Create Swagger document
  // const document = SwaggerModule.createDocument(app, config);

  // // Set up Swagger UI at the /api endpoint
  // SwaggerModule.setup('api', app, document);
  app.use(cookieParser()); // WE will not get cookie for other routes/ requests if we dont pass
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
