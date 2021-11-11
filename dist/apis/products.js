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
exports.productsAPI = void 0;
const products_factory_1 = require("../models/productos/products.factory");
const products_factory_2 = require("../models/productos/products.factory");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = products_factory_2.TipoPersistencia.MongoAtlas;
class prodAPI {
    constructor() {
        this.productos = products_factory_1.NoticiasFactoryDAO.get(tipo);
    }
    getProducts(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return this.productos.get(id);
            return this.productos.get();
        });
    }
    addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productos.add(productData);
            return newProduct;
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.productos.update(id, productData);
            return updatedProduct;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.delete(id);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productos.query(options);
        });
    }
}
exports.productsAPI = new prodAPI();
//# sourceMappingURL=products.js.map