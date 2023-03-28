import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { lastValueFrom } from 'rxjs';
import config from 'src/config';

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
    // TODO: conexion a base de datos mongo
    // TODO: sigue el patron de singleton
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;

        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'TASK', 'MONGO'],
})
export class DatabaseModule {}

// TODO: se instancia en todos los modulos sin necesidad de hacer el import
