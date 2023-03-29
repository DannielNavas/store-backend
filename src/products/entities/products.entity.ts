// TODO: esto funciona en tiempo de desarrollo pero en produccion no (respetar el tipado)
// export interface Product {
//   id?: number;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
//   stock: number;
//   createAt: Date;
//   updateAt: Date;
// }
// TODO: cambiar esto como entity, los entity y los dtos se manejan por aparte y no se deben mezclar

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
