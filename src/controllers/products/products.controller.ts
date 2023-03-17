import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `Products limit: ${limit} offset: ${offset} brand: ${brand}`,
    };
  }

  // TODO: toma el filter como un parametro products/:id se organiza no dinamicas primeras y dinamicas despues
  @Get('/filter')
  getProductFilter() {
    return { message: `Yo soy un filter` };
  }

  //TODO: se debe crear el enspoint con plurales tareas -> tasks personas -> people
  // PARAMS
  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return `Product ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'action create',
      payload,
    };
  }
}
