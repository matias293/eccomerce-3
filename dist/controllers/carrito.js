"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoController = void 0;
const carts_1 = require("../apis/carts");
const logger_1 = __importDefault(require("../config/logger"));
const gmail_1 = require("../services/gmail");
const twilio_1 = require("../services/twilio");
class Carrito {
    getCarrito(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.user) {
                    const user = req.user;
                    const result = yield carts_1.CartAPI.getCart(user._id);
                    return res.json({
                        data: result,
                    });
                }
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    postCarrito(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.user) {
                    const user = req.user;
                    const { _id, nombre, email, telefono } = user;
                    const carro = yield carts_1.CartAPI.getCart(_id);
                    const { products } = carro;
                    if (products.length === 0) {
                        res.status(404).json({ message: 'Usted no tiene productos en su carrito' });
                    }
                    let message = '';
                    products.forEach((prod) => {
                        message += `${prod.productId.nombre} - Cantidad ${prod.quantity} \n`;
                    });
                    const subject = `Nuevo pedido de ${nombre}-${email}`;
                    yield gmail_1.EmailService.sendEmail(email, subject, message);
                    yield twilio_1.SmsService.sendMessage(telefono, message);
                    yield twilio_1.SmsService.sendMessageWhatsapp(telefono, message);
                    yield carts_1.CartAPI.clearCart(_id);
                    res.json({ message: 'Su compra se realizo correctamente' });
                }
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    addCarritoProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cantidad = req.query.cantidad;
            const cant = Number(cantidad) | 1;
            try {
                if (req.user) {
                    const user = req.user;
                    const cartId = user._id;
                    const updatedCart = yield carts_1.CartAPI.addProduct(cartId, id, cant);
                    if (updatedCart) {
                        res.json({
                            msg: 'Producto agregado con exito',
                            data: updatedCart,
                        });
                    }
                }
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    deleteCarritoProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cantidad = req.query.cantidad;
            const cant = Number(cantidad) || 1;
            try {
                if (req.user) {
                    const user = req.user;
                    const cartId = user._id;
                    const carro = yield carts_1.CartAPI.deleteProduct(cartId, id, cant);
                    res.json({
                        msg: 'Producto borrado',
                        carro
                    });
                }
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        });
    }
}
exports.carritoController = new Carrito();
//# sourceMappingURL=carrito.js.map