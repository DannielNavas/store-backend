import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Product } from 'src/products/entities/products.entity';
import { User } from './user.entity';

export class Order {
  date: Date;
  user: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Product.name }],
  })
  products: Types.Array<Product>;
}

// TODO: en el DTO se debe referencial el products
// TODO: en el dto puedo agregar omisiones con el  OmitType de @nestjs/swagger -> PartialType(OmitType(OrderDto, ['Products']))

//TODO: en el servicio de findAll se agrega el populate para que traiga los productos y los customers se agregan dos .populate('products').populate('customers')
