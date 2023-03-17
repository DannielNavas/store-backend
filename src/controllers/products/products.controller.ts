import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Products: Limit => ${limit}, Offset => ${offset} Brand => ${brand}`;
  }

  // TODO: toma el filter como un parametro products/:id se organiza no dinamicas primeras y dinamicas despues
  @Get('/filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }

  //TODO: se debe crear el enspoint con plurales tareas -> tasks personas -> people
  // PARAMS
  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return `Product ${id}`;
  }
}
