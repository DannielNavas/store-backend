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

import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  // TODO: si todo es prioritario al final nada lo es (no es necesario poner index: true a todos los campos)
  @Prop({ type: Number, required: true, index: true })
  price: number;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop()
  image: string;

  // TODO: relacion de uno a uno
  @Prop(
    raw({
      name: { type: String, required: true },
      image: { type: String, required: true },
    }),
  )
  category: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// TODO: esto es para crear un indice compuesto, y la forma de ordenar es con 1 y -1 (1 es ascendente y -1 es descendente)
ProductSchema.index({ price: 1, stock: -1 });
