import mongoose, {Schema, model,Types} from 'mongoose'
import moment from 'moment'

import logger from '../../../config/logger';
import { CartI, CartBaseClass,Error,ProductCart } from '../carrito.interfaces'
import Config from '../../../config/index'

interface Carrito{
  userId:   Types.ObjectId;
  products: Productos[];
  timestamp:string;

}

interface Productos {
  productId: Types.ObjectId;
  quantity?:  number;
}



const carritoSchema = new mongoose.Schema<Carrito>({
    
    timestamp:{ type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },

    products:  [
          {   
            quantity: { type: Number },
            productId: {
              type: Schema.Types.ObjectId,
              ref: 'Productos',
            }
          }
        ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  })

  carritoSchema.methods.clearCart = async function() {
    try {
      this.products = [];
    return await this.save();
    } catch (error) {
      logger.error(error)
    }
    
  };

  carritoSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}

  carritoSchema.methods.addToCart = async  function(product,cantidad:number) {
    try {
      const cartProductIndex = this.products.findIndex((cp)=> {
        return cp.productId.toString() === product._id.toString();
      });
      let newQuantity = cantidad;
      const updatedCartItems = [...this.products];
      
      
      
      if (cartProductIndex >= 0 ) {
        newQuantity = this.products[cartProductIndex].quantity + newQuantity;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
        this.products = updatedCartItems;
      } else {
     
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      });
      this.products = updatedCartItems;
      }
      await this.save()
    return this
    
    } catch (error) {
      logger.error(error)
    }
    
  };

  carritoSchema.methods.removeFromCart = async function  (productId) {
    try {
      const updatedCartItems = this.products.filter((item) => {
      
      return item.productId.toString() !== productId.toString();
    });
    this.products = updatedCartItems;
  
    return await this.save();
    } catch (error) {
      logger.error(error)
    }
    
  };


  export class CartsAtlasDAO implements CartBaseClass {
    private srv: string;
    private carts:any;
  
    constructor(local: boolean = false) {
      if (local){
        this.srv = `mongodb://localhost:27017/${Config.MONGOLOCAL_INGRESS}`;
      }
      else {
        this.srv = Config.MONGO_INGRESS;
        mongoose.connect(this.srv);
      }
      this.carts = model('Carrito', carritoSchema );
    }
  
    async get(userId: string): Promise<CartI> {
      
        const cart : CartI = await this.carts.findOne({ userId }).populate('products.productId');
  
        if (!cart){
          const error:Error = new Error('cart not found');
            error.statusCode = 404;
            throw error;
        }   
        return cart ;
      
    }
  
    async createCart(userId: string): Promise<CartI> {
      const newCart = new this.carts({
        userId,
        products: [],
      });
  
      await newCart.save();
  
      return newCart;
    }
  
  
  
    async addProduct(userId: string, product:any,amount:number): Promise<CartI> {
      
      const cart = await this.carts.findOne(userId);
      
     
      if (!cart){
          const error:Error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
           
      } 
      const cartUpdated = await cart.addToCart(product,amount)
      return cartUpdated 
      
      
    }
  
    async deleteProduct(userId: string, product: any, amount:number): Promise<CartI> {
     
        const cart = await this.carts.findOne(userId);
        
        
        if (!cart){
          const error:Error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
        } 
        
        const index = cart.products.findIndex((aProduct: ProductCart) => {
         return  aProduct.productId.toString() === product._id.toString()
        }
        );
        
    
        if (index < 0){
          const error:Error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        } 
        const amountProduct = cart.products[index].quantity
        if (amountProduct <= amount){
          cart.products.splice(index, 1);
        }
        else{  
          cart.products[index].quantity = amountProduct - amount;
        } 
    
        await cart.save();
        return cart;

     
      
    }

    async clearCart(cartId:string){
      const cart = await this.carts.findById(cartId);
      if (!cart){
        const error:Error = new Error('Cart not found');
          error.statusCode = 404;
          throw error;
      } 
      await cart.clearCart()
    }
  }
  