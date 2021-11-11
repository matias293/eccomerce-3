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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartAPI = void 0;
const carrito_factory_1 = require("../models/carrito/carrito.factory");
const carrito_factory_2 = require("../models/carrito/carrito.factory");
const users_1 = require("./users");
const products_1 = require("./products");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = carrito_factory_2.TipoPersistencia.MongoAtlas;
class Cart {
    constructor() {
        this.carts = carrito_factory_1.CartFactoryDAO.get(tipo);
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carts.get(userId);
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.UserAPI.getUsers(userId);
            if (!user) {
                const error = new Error('User does not exist. Error creating cart');
                error.statusCode = 404;
                throw error;
            }
            const newCart = yield this.carts.createCart(userId);
            return newCart;
        });
    }
    addProduct(cartId, productId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_1.productsAPI.getProducts(productId);
            const updatedCart = yield this.carts.addProduct(cartId, product, amount);
            return updatedCart;
        });
    }
    deleteProduct(cartId, productId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_1.productsAPI.getProducts(productId);
            const updatedCart = yield this.carts.deleteProduct(cartId, product, amount);
            return updatedCart;
        });
    }
    clearCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.carts.clearCart(cartId);
        });
    }
}
exports.CartAPI = new Cart();
//# sourceMappingURL=carts.js.map