// TODO: esto funciona en tiempo de desarrollo pero en produccion no (respetar el tipado)
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
// TODO: cambiar esto como entity

// export class Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   image: string;
// }
