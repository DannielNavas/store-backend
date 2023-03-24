import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  // TODO: forma de exportar el service para que pueda ser usado en otros modulos
  exports: [ProductsService],
})
export class ProductsModule {}
