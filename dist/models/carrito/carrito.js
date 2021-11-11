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
const mongoose_1 = __importStar(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const logger_1 = __importDefault(require("../config/logger"));
const carritoSchema = new mongoose_1.default.Schema({
    timestamp: { type: String, default: moment_1.default().format('DD/MM/YYYY HH:mm:ss') },
    products: [
        {
            quantity: { type: Number },
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Productos',
            }
        }
    ],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    }
});
carritoSchema.methods.clearCart = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            this.products = [];
            return yield this.save();
        }
        catch (error) {
            logger_1.default.error(error);
        }
    });
};
carritoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = __rest(_a, ["__v"]);
    return data;
};
carritoSchema.methods.addToCart = function (product, cantidad) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cartProductIndex = this.products.findIndex((cp) => {
                return cp.productId.toString() === product._id.toString();
            });
            let newQuantity = cantidad;
            const updatedCartItems = [...this.products];
            if (cartProductIndex >= 0) {
                newQuantity = this.products[cartProductIndex].quantity + newQuantity;
                updatedCartItems[cartProductIndex].quantity = newQuantity;
                this.products = updatedCartItems;
            }
            else {
                updatedCartItems.push({
                    productId: product._id,
                    quantity: newQuantity
                });
                this.products = updatedCartItems;
            }
            return yield this.save();
        }
        catch (error) {
            logger_1.default.error(error);
        }
    });
};
carritoSchema.methods.removeFromCart = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCartItems = this.products.filter((item) => {
                return item.productId.toString() !== productId.toString();
            });
            this.products = updatedCartItems;
            return yield this.save();
        }
        catch (error) {
            logger_1.default.error(error);
        }
    });
};
exports.default = mongoose_1.model('Carrito', carritoSchema);
//# sourceMappingURL=carrito.js.map