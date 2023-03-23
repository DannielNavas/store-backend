import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ProductsService } from 'src/services/products/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `Products limit: ${limit} offset: ${offset} brand: ${brand}`,
    // };
    return this.productsService.findAll();
  }

  // TODO: toma el filter como un parametro products/:id se organiza no dinamicas primeras y dinamicas despues
  @Get('/filter')
  getProductFilter() {
    return { message: `Yo soy un filter` };
  }

  //TODO: se debe crear el enspoint con plurales tareas -> tasks personas -> people
  // PARAMS
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    // TODO:  Nest nos permite usar el response de expresspero si lo indicamos siempre espera que nosotros hagamos el response, de lo contrario nest se encarga de la respuesta
    // @Res() response: Response,
    // return response.status(201).json({ message: `Product ${id}` });
    // return { message: `Product ${id}` };
    console.log('--'.repeat(20));
    console.log(id);
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'action create',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  //TODO: PUT edita completamente y PATCH edita parcialmente

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    // return {
    //   message: `action update ${id}`,
    //   payload,
    // };
    return this.productsService.update(+id, payload);
  }
  //TODO: los pipes ayudan a validar y tranformar a un number o el tipo de dato necesario
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    // return {
    //   message: `action delete ${id}`,
    // };
    return this.productsService.delete(id);
  }
}
