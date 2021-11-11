"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const carrito_1 = require("../controllers/carrito");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.Router();
router.get('/', isAuth_1.isAuth, express_async_handler_1.default(carrito_1.carritoController.getCarrito));
router.post('/agregar/:id', isAuth_1.isAuth, express_async_handler_1.default(carrito_1.carritoController.addCarritoProduct));
router.get('/comprar', isAuth_1.isAuth, express_async_handler_1.default(carrito_1.carritoController.postCarrito));
router.delete('/borrar/:id', isAuth_1.isAuth, express_async_handler_1.default(carrito_1.carritoController.deleteCarritoProduct));
exports.default = router;
//# sourceMappingURL=carrito.js.map