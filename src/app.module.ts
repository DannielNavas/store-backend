//TODO: Dependencias de terceros va de primeras y luego las propias
import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

// const uri =
//   'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';

// const client = new MongoClient(uri);
// async function run() {
//   await client.connect();
//   const database = client.db('store');
//   const taskColection = database.collection('tasks');
//   const tasks = await taskColection.find().toArray();
//   console.log(tasks);
// }

// run();

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
