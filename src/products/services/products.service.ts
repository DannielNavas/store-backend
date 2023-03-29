import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      // TODO: manejo de errores el throw new error es 500
      // throw new Error(`Product ${id} not found`);
      // TODO: manejo de errores el throw new NotFoundException es 404
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counterId = this.counterId + 1;
  //   const newProduct = {
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[index];
  //   }
  // }

  // delete(id: number) {
  //   const product = this.products.find((item) => item.id === id);
  //   if (!product) {
  //     // TODO: manejo de errores el throw new error es 500
  //     // throw new Error(`Product ${id} not found`);
  //     // TODO: manejo de errores el throw new NotFoundException es 404
  //     throw new NotFoundException(`Product ${id} not found`);
  //   }
  //   return this.products.filter((item) => item.id !== id);
  // }
}
