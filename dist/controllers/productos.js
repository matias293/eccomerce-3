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
exports.productsController = void 0;
const products_1 = require("../apis/products");
const logger_1 = __importDefault(require("../config/logger"));
const file_1 = require("../util/file");
const validators_1 = require("../helpers/validators");
class Producto {
    checkProductExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const producto = yield products_1.productsAPI.getProducts(id);
                if (producto)
                    next();
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, codigo, minPrecio, maxPrecio, minStock, maxStock } = req.query;
            try {
                if (id) {
                    const result = yield products_1.productsAPI.getProducts(id);
                    if (!result) {
                        return res.status(404).json({
                            data: 'Producto no encontrado',
                        });
                    }
                    return res.json({
                        data: result,
                    });
                }
                const query = {};
                if (nombre)
                    query.nombre = nombre.toString();
                if (codigo)
                    query.codigo = codigo.toString();
                if (minPrecio)
                    query.minPrecio = Number(minPrecio);
                if (maxPrecio)
                    query.maxPrecio = Number(maxPrecio);
                if (minStock)
                    query.minStock = Number(minStock);
                if (maxStock)
                    query.maxStock = Number(maxStock);
                if (Object.keys(query).length) {
                    return res.json({
                        data: yield products_1.productsAPI.query(query),
                    });
                }
                let data = yield products_1.productsAPI.getProducts();
                if (!data) {
                    return res.status(404).json({
                        data: 'No hay productos en el carro',
                    });
                }
                res.json({
                    data
                });
            }
            catch (err) {
                if (err.isJoi === true)
                    err.status = 422;
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    addProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield validators_1.schemaAddProduct.validateAsync(req.body);
                const foto = req.file;
                if (!foto) {
                    const error = new Error('Seleccione alguna imagen');
                    error.statusCode = 404;
                    throw error;
                }
                const imageUrl = foto.path.replace("\\", "/");
                const newProduct = {
                    nombre: result.nombre,
                    precio: result.precio,
                    descripcion: result.descripcion,
                    codigo: result.codigo,
                    foto: imageUrl,
                    stock: result.stock
                };
                const product = yield products_1.productsAPI.addProduct(newProduct);
                res.json({
                    msg: 'Producto agregado con exito',
                    data: product,
                });
            }
            catch (err) {
                if (err.isJoi === true)
                    err.statusCode = 422;
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    updateProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageUrl;
                const id = req.params.id;
                const foto = req.file;
                const producto = yield products_1.productsAPI.getProducts(id);
                const path = producto.foto;
                if (foto) {
                    file_1.deleteFile(path);
                    imageUrl = foto.path.replace("\\", "/");
                }
                const result = yield validators_1.schemaUpdateProduct.validateAsync(req.body);
                let updateProduct = { foto: imageUrl };
                if (result.nombre)
                    updateProduct.nombre = result.nombre;
                if (result.precio)
                    updateProduct.precio = result.precio;
                if (result.descripcion)
                    updateProduct.descripcion = result.descripcion;
                if (result.codigo)
                    updateProduct.codigo = result.codigo;
                if (result.stock)
                    updateProduct.stock = result.stock;
                const updatedItem = yield products_1.productsAPI.updateProduct(id, updateProduct);
                res.json({
                    msg: 'Actualizando producto',
                    data: updatedItem,
                });
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        });
    }
    deleteProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const producto = yield products_1.productsAPI.getProducts(id);
                const path = producto.foto;
                file_1.deleteFile(path);
                yield products_1.productsAPI.deleteProduct(id);
                res.json({
                    msg: 'Producto borrado',
                });
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        });
    }
}
exports.productsController = new Producto();
//# sourceMappingURL=productos.js.map