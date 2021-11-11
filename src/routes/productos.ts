import { Router } from 'express';
import { productsController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/listar',productsController.checkProductExists, asyncHandler(productsController.getProducts));

router.get(
  '/listar/:id',
  productsController.checkProductExists,
  asyncHandler(productsController.getProducts)
);

router.post(
  '/agregar',
  checkAdmin,
  asyncHandler(productsController.addProducts)
);

router.put(
  '/actualizar/:id',
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.updateProducts)
);

router.delete(
  '/borrar/:id',
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.deleteProducts)
);

export default router;
