import { Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  // TODO: se importa el module de products para poder usarlo en este modulo (PRoductsService) se utiliza en el servicio de users
  imports: [ProductsModule],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
