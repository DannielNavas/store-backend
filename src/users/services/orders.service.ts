// export class OrderService {
//   async removeProduct(id: string, productId: string) {
//     const order = await this.orderModel.findById(id);
//     order.products.pull(productId);
//     return await order.save();
//   }

//   async addProducts(id: string, productsIds: string[]) {
//     const order = await this.orderModel.findById(id);
//     order.products.push(...productsIds);
//     return await order.save();
//   }
// }
//TODO: esto se agrega en el controller por el metodo delete ':id/products/:productId'

// TODO: se crea otro dto para manejar unicamente los ids que es un array de strings se crea un nuevo endpoint donde se manejar por el update
