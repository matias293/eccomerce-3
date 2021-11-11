"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../controllers/productos");
const admin_1 = require("../middleware/admin");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.Router();
router.get('/listar', productos_1.productsController.checkProductExists, express_async_handler_1.default(productos_1.productsController.getProducts));
router.get('/listar/:id', productos_1.productsController.checkProductExists, express_async_handler_1.default(productos_1.productsController.getProducts));
router.post('/agregar', admin_1.checkAdmin, express_async_handler_1.default(productos_1.productsController.addProducts));
router.put('/actualizar/:id', admin_1.checkAdmin, productos_1.productsController.checkProductExists, express_async_handler_1.default(productos_1.productsController.updateProducts));
router.delete('/borrar/:id', admin_1.checkAdmin, productos_1.productsController.checkProductExists, express_async_handler_1.default(productos_1.productsController.deleteProducts));
exports.default = router;
//# sourceMappingURL=productos.js.map