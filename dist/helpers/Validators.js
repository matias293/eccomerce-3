"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUpdateProduct = exports.schemaAddProduct = exports.schemaAuth = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemaAuth = joi_1.default.object({
    email: joi_1.default.string().trim().email().lowercase().required(),
    password: joi_1.default.string().min(2).required(),
    repeat_password: joi_1.default.ref('password'),
    nombre: joi_1.default.string().required(),
    direccion: joi_1.default.string().min(5).required(),
    edad: joi_1.default.number().required(),
    telefono: joi_1.default.string().length(10).pattern(/^[0-9]+$/).required()
}).with('password', 'repeat_password');
exports.schemaAddProduct = joi_1.default.object({
    nombre: joi_1.default.string().trim().required(),
    precio: joi_1.default.number().required(),
    descripcion: joi_1.default.string().min(2).required(),
    codigo: joi_1.default.string().required(),
    foto: joi_1.default.string().required(),
    stock: joi_1.default.number().required()
});
exports.schemaUpdateProduct = joi_1.default.object({
    nombre: joi_1.default.string().trim(),
    precio: joi_1.default.number(),
    descripcion: joi_1.default.string().min(2),
    codigo: joi_1.default.string(),
    foto: joi_1.default.string(),
    stock: joi_1.default.number()
});
//# sourceMappingURL=validators.js.map