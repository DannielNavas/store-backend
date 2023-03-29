import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { Product, ProductSchema } from './entities/products.entity';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  // TODO: forma de exportar el service para que pueda ser usado en otros modulos
  exports: [ProductsService],
})
export class ProductsModule {}
