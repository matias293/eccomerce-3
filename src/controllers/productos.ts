import { Request, Response, NextFunction } from 'express';

import {productsAPI} from '../apis/products'
import {ProductQuery,newProductI,Error,newProductU,ProductI} from '../models/productos/products.interfaces'
import logger from '../config/logger'
import {deleteFile} from '../util/file'
import {schemaAddProduct,schemaUpdateProduct} from '../helpers/validators'

interface MulterRequest extends Request {
  file: any;
}

class Producto {
  
  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      
      const producto = await productsAPI.getProducts(id)
      if(producto) next()
    
    } catch (err : any ) { 
      logger.error(err)
      next(err);
    } 
    
  }

  async getProducts(req: Request, res: Response,next: NextFunction) {
    const { id } = req.params;
    const { nombre, codigo, minPrecio, maxPrecio, minStock, maxStock } = req.query;
    try {
      if (id) {
      
        const result = await productsAPI.getProducts(id);
        
        if (!result){         
          return res.status(404).json({
            data: 'Producto no encontrado',
          });
        }
  
        return res.json({
          data: result,
        });
      }
      const query: ProductQuery = {};

        if (nombre) query.nombre = nombre.toString();

        if (codigo) query.codigo = codigo.toString();

        if (minPrecio) query.minPrecio = Number(minPrecio);

        if (maxPrecio) query.maxPrecio = Number(maxPrecio);

        if (minStock) query.minStock = Number(minStock);

        if (maxStock) query.maxStock = Number(maxStock);

      if (Object.keys(query).length) {
        
        return res.json({
          data: await productsAPI.query(query),
        });
      }
    let data = await productsAPI.getProducts()
    if(!data){
      return res.status(404).json({
        data: 'No hay productos en el carro',
      });
    }

      res.json({
        data
      });

    } catch (err : any ) {
      if (err.isJoi === true) err.status = 422 
      logger.error(err)
      next(err);
    } 

  }

async addProducts(req: Request, res: Response,next: NextFunction) {
 try {
     const result = await schemaAddProduct.validateAsync(req.body)
      
      const foto = (req as MulterRequest).file;
      if(!foto){
        const error : Error= new Error('Seleccione alguna imagen');
          error.statusCode = 404;
          throw error;
      }
       const imageUrl = foto.path.replace("\\" ,"/")


      const newProduct  = {
        nombre:result.nombre,
        precio:result.precio, 
        descripcion:result.descripcion, 
        codigo:result.codigo, 
        foto:imageUrl, 
        stock:result.stock
      } 
 const product = await productsAPI.addProduct(newProduct)
  

  res.json({
    msg: 'Producto agregado con exito',
    data: product,
  });

} catch (err : any ) { 
 
  if (err.isJoi === true) err.statusCode = 422
 
  logger.error(err)
  next(err);
} 
  }

  async updateProducts(req: Request, res: Response,next: NextFunction) {
   
try {
  let imageUrl;
  const id : string = req.params.id;
  const foto = (req as MulterRequest).file;
  
  const producto = await productsAPI.getProducts(id)
  const path : string = producto.foto 
  
  if(foto ){
     deleteFile(path)
    imageUrl  = foto.path.replace("\\" ,"/")
    
  }
  
  const result = await schemaUpdateProduct.validateAsync(req.body)
  let updateProduct : newProductU = {foto:imageUrl}

  if(result.nombre)      updateProduct.nombre = result.nombre
  if(result.precio)      updateProduct.precio = result.precio
  if(result.descripcion) updateProduct.descripcion = result.descripcion
  if(result.codigo)      updateProduct.codigo = result.codigo
  if(result.stock)       updateProduct.stock = result.stock

  
  
  const updatedItem = await productsAPI.updateProduct(id,updateProduct);

    res.json({
      msg: 'Actualizando producto',
      data: updatedItem,
    });
  } catch (err : any ) { 
    
    logger.error(err)
    next(err);
  } 
    
  }

  async deleteProducts(req: Request, res: Response,next: NextFunction) {
    const id : string = req.params.id;

    try {
      const producto = await productsAPI.getProducts(id)
      const path : string = producto.foto 
      deleteFile(path)
      await productsAPI.deleteProduct(id);
    res.json({
      msg: 'Producto borrado',
    });
  } catch (err : any ) { 
    
    logger.error(err)
    next(err);
  } 
  }
}

export const productsController = new Producto();
