import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// TODO: ejecuta nuestra aplicacion
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: va a quitar del payload todos los atributos que no esten definidos en el dto -with whitelist
  // TODO con forbidNonWhitelisted se alerta en la respuesta de la api que se envia un atributo que no esta definido en el dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
