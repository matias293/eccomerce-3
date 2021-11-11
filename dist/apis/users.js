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
exports.UserAPI = void 0;
const user_factory_1 = require("../models/users/user.factory");
const user_factory_2 = require("../models/users/user.factory");
const carts_1 = require("./carts");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = user_factory_2.TipoPersistencia.MongoAtlas;
class User {
    constructor() {
        this.users = user_factory_1.UserFactoryDAO.get(tipo);
    }
    getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.get(id);
            return user;
        });
    }
    addUser(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.users.add(productData);
            yield carts_1.CartAPI.createCart(newUser._id);
            return newUser;
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.users.update(id, userData);
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.users.delete(id);
            //Borrar carrito tambien
        });
    }
    query(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (email)
                query.email = email;
            return this.users.query(query);
        });
    }
    validatePassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.validateUserPassword(username, password);
        });
    }
}
exports.UserAPI = new User();
//# sourceMappingURL=users.js.map