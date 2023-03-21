import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/products.model';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: '1',
      name: 'Product One',
      description: 'Description of product one',
      price: 100,
      image: '',
      createAt: new Date(),
      updateAt: new Date(),
      stock: 100,
    },
    {
      id: '2',
      name: 'Product Two',
      description: 'Description of product two',
      price: 200,
      image: '',
      createAt: new Date(),
      updateAt: new Date(),
      stock: 100,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: Product) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: String(this.counterId),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct.id;
  }

  update(id: string, payload: any) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.products[index] = payload;
      return this.products[index];
    }
  }

  delete(id: string) {
    return this.products.filter((item) => item.id !== id);
  }
}
