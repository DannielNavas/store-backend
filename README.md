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
