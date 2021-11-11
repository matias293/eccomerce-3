export interface newProductI {
    nombre:string;
    precio:number;
    descripcion:string;
    codigo:string;
    foto:string;
    stock:number;
  }

  export interface newProductU {
    nombre?:string;
    precio?:number;
    descripcion?:string;
    codigo?:string;
    foto?:string;
    stock?:number;
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

  
  
  export interface ProductQuery {
    nombre?: string;
    codigo?: string;
    minPrecio?: number;
    maxPrecio?: number;
    minStock?: number;
    maxStock?: number;
  }
  
  export interface ProductBaseClass {
    get(id?: string | undefined): Promise<ProductI[] | ProductI>;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<ProductI>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductI[]>;
  }

  export interface Error{
    statusCode?:number;
    message?: string;
}

export interface ProductoC{
  productId:string;
  quantity:number;
}