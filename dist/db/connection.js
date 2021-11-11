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
exports.dbConnection = void 0;
const mongoose = require('mongoose');
const config_1 = __importDefault(require("../config"));
const dbConnection = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connection) {
            return yield mongoose.connect(config_1.default.MONGOLOCAL_INGRESS);
        }
        yield mongoose.connect(config_1.default.MONGO_INGRESS);
    }
    catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos');
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=connection.js.map