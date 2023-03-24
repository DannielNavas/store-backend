import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
  // PARAMS
  // @Get('products/:id')
  // getProduct(@Param('id') id: string) {
  //   return `Product ${id}`;
  // }

  // @Get('categories/:id/products/:productId')
  // getCategory(@Param('id') id: string, @Param('productId') productId: string) {
  //   return `Category ${id}, Product ${productId}`;
  // }

  // QUERY PARAMS

  // @Get('products')
  // getProducts(@Query() params: any) {
  //   const { limit, offset } = params;
  //   return `Products: Limit => ${limit}, Offset => ${offset}`;
  // }
  // TODO: no importa el orden de los parametros
  // @Get('products')
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return `Products: Limit => ${limit}, Offset => ${offset} Brand => ${brand}`;
  // }
  // TODO: toma el filter como un parametro products/:id se organiza no dinamicas primeras y dinamicas despues
  // @Get('products/filter')
  // getProductFilter() {
  //   return `Yo soy un filter`;
  // }
}
