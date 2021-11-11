import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {carritoController} from '../controllers/carrito'
import {isAuth} from '../middleware/isAuth'


const router = Router();

router.get('/', isAuth ,asyncHandler(carritoController.getCarrito) );

router.post('/agregar/:id',isAuth ,asyncHandler(carritoController.addCarritoProduct));

router.get('/comprar', isAuth ,asyncHandler(carritoController.postCarrito) )

router.delete('/borrar/:id', isAuth ,asyncHandler(carritoController.deleteCarritoProduct));

export default router;
