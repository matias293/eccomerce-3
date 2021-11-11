import mongoose, {Schema, model} from 'mongoose'

import {ProductI} from '../products.interfaces'
import Config from '../../../config/index'
import logger from '../../../config/logger'
import {newProductI,ProductQuery, Error,ProductBaseClass,newProductU} from '../products.interfaces'


const productsSchema = new mongoose.Schema<ProductI>({
    nombre: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    descripcion:{
      type: String,
      required: true
    },
    codigo:{
      type: String,
      required: true
    },
    foto:{
      type: String,
      required: true
    },
    stock:{
      type: Number,
      required: true
    }
  })

  productsSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}

export class ProductosAtlasDAO implements ProductBaseClass {
  private srv: string;
  private productos:any;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGOLOCAL_INGRESS}`;
    
    else this.srv = Config.MONGO_INGRESS;
    mongoose.connect(this.srv);
    this.productos = model('Productos', productsSchema);
  }

  async get(id?: string): Promise<ProductI[] | ProductI> {
    let output: ProductI[] | ProductI = [];
    
      if (id) {
          const product : ProductI = await this.productos.findById(id);
            if(!product){
              const error:Error = new Error('Product not found');
              error.statusCode = 404;
              throw error;
            }   
            output  = product as unknown  as ProductI;
       
      } else {
        const products  = await this.productos.find();
        output = products as unknown  as ProductI[];
        
      }
      return output
    
  }

  async add(data: newProductI): Promise<ProductI> {


    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductU): Promise<ProductI> {
    const updateProduct = await  this.productos.findByIdAndUpdate(id, newProductData);
    return updateProduct
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(query: ProductQuery): Promise<ProductI[]> {

    return this.productos.find(query);
  }
}
  export default  model('Productos', productsSchema);