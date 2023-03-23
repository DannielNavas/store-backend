import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsController } from './products/controllers/brands/brands.controller';
import { CategoriesController } from './products/controllers/categories/categories.controller';
import { CustomersController } from './products/controllers/customers/customers.controller';
import { OrdersController } from './products/controllers/orders/orders.controller';
import { ProductsController } from './products/controllers/products/products.controller';
import { UsersController } from './products/controllers/users/users.controller';
import { ProductsService } from './products/services/products/products.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService],
})
export class AppModule {}
