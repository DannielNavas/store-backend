<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Notes

Desarrollar una API correctamente también implica manejar los errores que sus endpoints pueden tener de manera clara para el front-end.

Manejo de errores con NestJS
NestJS implementa de forma muy sencilla la posibilidad de responder con errores al cliente que realiza las consultas. Esto lo hace con una serie de clases que implementan los códigos HTTP correctos dependiendo el tipo de error que necesites.

import { NotFoundException } from '@nestjs/common';

@Get('product/:idProduct')
@HttpCode(HttpStatus.OK)
async getProduct(@Param('idProduct') idProduct: string): string {
const product = await this.appService.getProducto(idProduct);
if (!product) {
throw new NotFoundException(`Producto con ID #${idProduct} no encontrado.`);
}
return product;
}
Importando NotFoundException puedes arrojar un error con la palabra reservada throw indicando que un registro no fue encontrado. Esta excepción cambiará el estado HTTP 200 que envía el decorador @HttpCode(HttpStatus.OK) por un 404 que es el correspondiente para la ocasión.

También puedes lanzar errores cuando el usuario no tiene permisos para acceder a un recurso.

import { ForbiddenException } from '@nestjs/common';

@Get('product/:idProduct')
@HttpCode(HttpStatus.OK)
async getProduct(@Param('idProduct') idProduct: string): string {
// ...
throw new ForbiddenException(`Acceso prohibido a este recurso.`);
}
O incluso lanzar errores de la familia del 5XX cuando ocurre un error inesperado en el servidor.

import { InternalServerErrorException } from '@nestjs/common';

@Get('product/:idProduct')
@HttpCode(HttpStatus.OK)
async getProduct(@Param('idProduct') idProduct: string): string {
// ...
throw new InternalServerErrorException(`Ha ocurrido un error inesperado.`);
}
Explora todas las clases con estados HTTP que NestJS posee para desarrollar tus endpoints de manera profesional y manejar correctamente los errores.

SRC services
// src/services/products.service.ts

import { ..., NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
...

findOne(id: number) {
const product = this.products.find((item) => item.id === id);
if (!product) {
throw new NotFoundException(`Product #${id} not found`);
}
return product;
}

update(id: number, payload: any) {
const product = this.findOne(id);
const index = this.products.findIndex((item) => item.id === id);
this.products[index] = {
...product,
...payload,
};
return this.products[index];
}

remove(id: number) {
const index = this.products.findIndex((item) => item.id === id);
if (index === -1) {
throw new NotFoundException(`Product #${id} not found`);
}
this.products.splice(index, 1);
return true;
}
}
// src/controllers/products.controller.ts

@Delete(':id')
delete(@Param('id') id: string) {
return this.productsService.remove(+id);
}
Contribución creada por: Kevin Fiorentino.

## Tener en cuenta

relacion uno a uno embebida el objeto se encuentra en el mismo documento, se utiliza para los que no crezcan mucho
relacion uno a uno referenciadas se guarda el id y se popula para que traiga el objeto completo

## Cómo tipar relaciones uno a muchos embebidas

En las relaciones embebidas usamos las siguientes dos formas:

Para relaciones 1:1 embebidas:

@Prop(
raw({
name: { type: String },
image: { type: String },
}),
)
category: Record<String, Any>;
Para relaciones 1:N embebidas:

@Prop({
type: [{ name: { type: String }, color: { type: String } }],
})
skills: Types.Array<Record<String, Any>>;
Sin embargo en los dos usamos any lo cual hace que no tengamos un tipado en estos documentos embebidos, por eso vamos a ver otra forma de lograrlo.

La solución
Lo primero es que vamos a crear un esquema para ese documento embebido, de esta manera:

// src/products/entities/sub-doc.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubDoc {
@Prop()
name: String;

@Prop()
description: String;
}

export const SubDocSchema = SchemaFactory.createForClass(SubDoc);
Con su respectivo DTO:

// src/products/dtos/sub-doc.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateSubDocDto {
@IsString()
@IsNotEmpty()
readonly name: String;

@IsString()
@IsNotEmpty()
readonly description: String;
}

export class UpdateSubDocDto extends PartialType(CreateSubDocDto) {}
Luego importamos este SubDoc dentro de la entidad que queramos que maneje la relación, así:

// src/products/entities/product.entity.ts

import { SubDoc, SubDocSchema } from './sub-doc.entity'; // 👈 import

...
export class Product extends Document {
...

@Prop({ type: SubDocSchema })
subDoc: SubDoc; // 👈 new field (1:1)

@Prop({ type: [SubDocSchema] })
subDocs: Types.Array<SubDoc>; // 👈 new field (1:N)
}
...
Debes tener en cuenta que este SubDoc no va a estar declarado en el módulo, ya que es un documento embebido y no una colección.

Con esto ya tienes el objeto embebido con tipado y además lo puedes incluir en tus DTOS para una validación más poderosa, de la siguiente manera:

// src/products/dtos/products.dtos.ts

import { ..., IsArray } from 'class-validator';
import { Type } from 'class-transformer'; // 👈 transform

import { CreateSubDocDto } from './sub-doc.dto'; // 👈 import

export class CreateProductDto {
...

@IsNotEmpty()
@ValidateNested()
readonly subDoc: CreateSubDocDto; // 👈 1:1

@IsNotEmpty()
@IsArray()
@ValidateNested({ each: true })
@Type(() => CreateSubDocDto)
readonly subDocs: CreateSubDocDto[]; // 👈 1:N
}

En este punto puedes crear un producto con un documento embebido de forma tipada y con una validación profunda, puedes ver esta forma en la rama 18 del proyecto por si quieres revisar el código a más detalle.

Si haces un POST te debería resultar algo así:
