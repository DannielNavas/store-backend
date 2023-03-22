export interface Product {
  id?: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  createAt: Date;
  updateAt: Date;
}
