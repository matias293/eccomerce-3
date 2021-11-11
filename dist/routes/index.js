"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = __importDefault(require("./productos"));
const carrito_1 = __importDefault(require("./carrito"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.Router();
router.use('/products', productos_1.default);
router.use('/cart', carrito_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map