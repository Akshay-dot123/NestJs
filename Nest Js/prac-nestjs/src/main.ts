import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // This will be instance of given DTO
    }),
  );

  // File rendering:-
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  // This will apply to all routes
  // app.use(AuthenticationMiddleware); Not working at present need to check
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
