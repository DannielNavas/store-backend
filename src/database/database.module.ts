import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD123456';
// TODO: esto indica que todo lo que se coloca aqui es global  -> providers
// TODO: el Global se usa para dejar las cosas generales para toda la aplicacion
@Global()
@Module({
  imports: [HttpModule],
  providers: [
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
  exports: ['API_KEY', 'TASK'],
})
export class DatabaseModule {}
