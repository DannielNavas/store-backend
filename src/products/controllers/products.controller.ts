import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ERoles } from 'src/auth/models/roles.model';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { ProductsService } from '../services/products.service';
import { Public } from './../../auth/decorators/public.decorator';

@ApiTags('products')
@Controller('products')
// TODO: para cuando quiero proteger todos los endpoints de un controlador
// @UseGuards(AuthGuard('jwt'))
// TODO: para cuando quierop proteger los endpoints de un controlador pero cuento con una excepcion EJ: el decorador Public
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductsDto) {
    // return {
    //   message: `Products limit: ${limit} offset: ${offset} brand: ${brand}`,
    // };
    return this.productsService.findAll(params);
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
  getProduct(@Param('id', MongoIdPipe) id: string) {
    // TODO:  Nest nos permite usar el response de expresspero si lo indicamos siempre espera que nosotros hagamos el response, de lo contrario nest se encarga de la respuesta
    // @Res() response: Response,
    // return response.status(201).json({ message: `Product ${id}` });
    // return { message: `Product ${id}` };
    console.log('--'.repeat(20));
    console.log(id);
    return this.productsService.findOne(id);
  }

  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'action create',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  // //TODO: PUT edita completamente y PATCH edita parcialmente

  @Put('/:id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    // return {
    //   message: `action update ${id}`,
    //   payload,
    // };
    return this.productsService.update(id, payload);
  }
  // //TODO: los pipes ayudan a validar y tranformar a un number o el tipo de dato necesario
  @Delete('/:id')
  delete(@Param('id', MongoIdPipe) id: string) {
    // return {
    //   message: `action delete ${id}`,
    // };
    return this.productsService.delete(id);
  }
}
