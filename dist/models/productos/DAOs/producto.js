"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosAtlasDAO = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const index_1 = __importDefault(require("../../../config/index"));
const productsSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});
productsSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = __rest(_a, ["__v"]);
    return data;
};
class ProductosAtlasDAO {
    constructor(local = false) {
        if (local)
            this.srv = `mongodb://localhost:27017/${index_1.default.MONGOLOCAL_INGRESS}`;
        else
            this.srv = index_1.default.MONGO_INGRESS;
        mongoose_1.default.connect(this.srv);
        this.productos = mongoose_1.model('Productos', productsSchema);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            if (id) {
                const product = yield this.productos.findById(id);
                if (!product) {
                    const error = new Error('Product not found');
                    error.statusCode = 404;
                    throw error;
                }
                output = product;
            }
            else {
                const products = yield this.productos.find();
                output = products;
            }
            return output;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new this.productos(data);
            yield newProduct.save();
            return newProduct;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateProduct = yield this.productos.findByIdAndUpdate(id, newProductData);
            return updateProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.findByIdAndDelete(id);
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.find(query);
        });
    }
}
exports.ProductosAtlasDAO = ProductosAtlasDAO;
exports.default = mongoose_1.model('Productos', productsSchema);
//# sourceMappingURL=producto.js.map