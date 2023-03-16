import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo!';
  }
  @Get('new')
  newEndpoint() {
    return 'Yo soy nuevo!';
  }
  //TODO: Nestjs resuelve la ruta con '/' o sin '/' al final
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
  //TODO: se debe crear el enspoint con plurales tareas -> tasks personas -> people

  @Get('products/:id')
  getProducts(@Param('id') id: string) {
    return `Product ${id}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Category ${id}, Product ${productId}`;
  }
}
