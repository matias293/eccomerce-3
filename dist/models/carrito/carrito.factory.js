"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartFactoryDAO = exports.TipoPersistencia = void 0;
const carrito_1 = require("./DAOs/carrito");
const logger_1 = __importDefault(require("../../config/logger"));
var TipoPersistencia;
(function (TipoPersistencia) {
    TipoPersistencia["LocalMongo"] = "LOCAL-MONGO";
    TipoPersistencia["MongoAtlas"] = "MONGO-ATLAS";
})(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {}));
class CartFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case TipoPersistencia.MongoAtlas:
                logger_1.default.info('Retornando Instancia Cart Mongo Atlas');
                return new carrito_1.CartsAtlasDAO();
            case TipoPersistencia.LocalMongo:
                logger_1.default.info('Retornando Instancia Cart Mongo Local');
                return new carrito_1.CartsAtlasDAO(true);
            default:
                logger_1.default.info('Retornando Instancia Cart Default');
                return new carrito_1.CartsAtlasDAO();
        }
    }
}
exports.CartFactoryDAO = CartFactoryDAO;
//# sourceMappingURL=carrito.factory.js.map