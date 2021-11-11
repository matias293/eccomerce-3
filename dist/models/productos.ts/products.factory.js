"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticiasFactoryDAO = exports.TipoPersistencia = void 0;
const producto_1 = require("./DAOs/producto");
const logger_1 = __importDefault(require("../../config/logger"));
var TipoPersistencia;
(function (TipoPersistencia) {
    TipoPersistencia["LocalMongo"] = "LOCAL-MONGO";
    TipoPersistencia["MongoAtlas"] = "MONGO-ATLAS";
})(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {}));
class NoticiasFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case TipoPersistencia.MongoAtlas:
                logger_1.default.info('Retornando Instancia Products Mongo Atlas');
                return new producto_1.ProductosAtlasDAO();
            case TipoPersistencia.LocalMongo:
                logger_1.default.info('Retornando Instancia Products Mongo Local');
                return new producto_1.ProductosAtlasDAO(true);
            default:
                logger_1.default.info('Retornando Instancia Products Default');
                return new producto_1.ProductosAtlasDAO();
        }
    }
}
exports.NoticiasFactoryDAO = NoticiasFactoryDAO;
//# sourceMappingURL=products.factory.js.map