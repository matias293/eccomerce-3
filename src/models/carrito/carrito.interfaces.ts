import { Schema } from 'mongoose';


export type productReference = Schema.Types.ObjectId | string;

export interface CartI {
  _id: string;
  userId: productReference;
  products: ProductCartPopulate[];
}

export interface ProductCart {
  productId: productReference;
  quantity: number;
}

export interface ProductI {
  _id: string;
  nombre:string;
  precio:number;
  descripcion:string;
  codigo:string;
  foto:string;
  stock:number;
}

export interface ProductCartPopulate {
  productId: ProductI;
  quantity: number;
}

export interface CartBaseClass {
  get(id: string): Promise<CartI>;
  createCart(userId: string): Promise<CartI>;
  addProduct(cartId: string, product:ProductI,amount:number): Promise<CartI>;
  deleteProduct(cartId: string, product: any, amount:number): Promise<CartI>;
}

export interface Error{
  statusCode?:number;
  message?: string;
}