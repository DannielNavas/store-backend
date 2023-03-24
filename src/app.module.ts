import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD123456';
@Module({
  imports: [ProductsModule, UsersModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    // TODO: forma de inyectar una constante en el modulo
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // TODO: detiene la ejecucion de la API hasta que se resuelva la peticion
    // TODO: se puede usar para conexion a base de datos ejemplo mongo que solicita una peticion asincrona
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const task = await lastValueFrom(request);
        return task.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
