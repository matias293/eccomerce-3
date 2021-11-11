import { Router } from 'express';
import productsRouter from './productos';
import cartRouter from './carrito';
import authRouter from './auth'

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/auth', authRouter)

export default router;
