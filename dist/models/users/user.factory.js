"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactoryDAO = exports.TipoPersistencia = void 0;
const user_1 = require("./DAOs/user");
const logger_1 = __importDefault(require("../../config/logger"));
var TipoPersistencia;
(function (TipoPersistencia) {
    TipoPersistencia["LocalMongo"] = "LOCAL-MONGO";
    TipoPersistencia["MongoAtlas"] = "MONGO-ATLAS";
})(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {}));
class UserFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case TipoPersistencia.MongoAtlas:
                logger_1.default.info('Retornando Instancia Users Mongo Atlas');
                return new user_1.UsuariosAtlasDAO();
            case TipoPersistencia.LocalMongo:
                logger_1.default.info('Retornando Instancia Users Mongo Local');
                return new user_1.UsuariosAtlasDAO(true);
            default:
                logger_1.default.info('Retornando Instancia Users Default');
                return new user_1.UsuariosAtlasDAO();
        }
    }
}
exports.UserFactoryDAO = UserFactoryDAO;
//# sourceMappingURL=user.factory.js.map