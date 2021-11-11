import { Request, Response, NextFunction,ErrorRequestHandler } from 'express';

import {CartAPI} from '../apis/carts'
import {UserI} from '../models/users/user.interface'
import {ProductCartPopulate} from '../models/carrito/carrito.interfaces'
import logger from '../config/logger'
import {EmailService} from '../services/gmail'
import {SmsService} from '../services/twilio'



declare global {
  namespace Express {
      export interface Request {
          user?: UserI;
      }
  }
}


class Carrito {
  
  async getCarrito(req: Request, res: Response, next:NextFunction ) {
    

    try {
      if (req.user) {

        const user = req.user

        const result = await CartAPI.getCart(user._id) ;
      
          return res.json({
            data: result,
          });
      }

    } catch (err : any ) { 
      
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      logger.error(err)
      next(err);
    } 
  }

  async postCarrito(req: Request, res: Response, next:NextFunction ){
    try {
      if(req.user){
        const user : UserI = req.user
      const {_id , nombre , email , telefono} = user

      const carro = await CartAPI.getCart(_id )
      const {products} = carro
      if(products.length === 0){
        res.status(404).json({message: 'Usted no tiene productos en su carrito'})
      }
      let  message = ''
      products.forEach((prod:ProductCartPopulate )   => {
        message += `${prod.productId.nombre} - Cantidad ${prod.quantity} \n`
      })
      
      const subject = `Nuevo pedido de ${nombre}-${email}`
      await EmailService.sendEmail(email,subject,message)
      await SmsService.sendMessage(telefono,message)
      await SmsService.sendMessageWhatsapp(telefono,message)
      
      await CartAPI.clearCart(_id)

      res.json({message:'Su compra se realizo correctamente'})
     }
    } catch (err : any ) { 
       
        logger.error(err)
        next(err);
    }
  }

  async addCarritoProduct(req: Request, res: Response, next:NextFunction ) {
    const {id} = req.params
    const cantidad = req.query.cantidad
    const cant  = Number(cantidad) | 1
    
    try {
     
     if(req.user){

        const user  = req.user
        const cartId = user._id 
        const updatedCart = await CartAPI.addProduct(cartId,id,cant)
        
        if(updatedCart){
          res.json({
            msg: 'Producto agregado con exito',
            data: updatedCart,
          });
        }
        
     }
    }catch (err : any ) { 
      logger.error(err)
      next(err);
  }
  }

  async deleteCarritoProduct(req: Request, res: Response, next:NextFunction ) {
    const {id} = req.params
    const cantidad = req.query.cantidad
    const cant  = Number(cantidad) || 1
    
      try {
      if(req.user){
        const user  = req.user
        const cartId = user._id 
        const carro = await CartAPI.deleteProduct(cartId,id,cant)
          res.json({
            msg: 'Producto borrado',
            carro
          });
      }
      } catch (err : any ) { 
        logger.error(err)
        next(err);
      } 
  }
}

export const carritoController = new Carrito();