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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const carrito_1 = __importDefault(require("./carrito"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../config/logger"));
const UsersSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    carritoId: {
        type: String
    }
});
UsersSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = __rest(_a, ["__v"]);
    return data;
};
UsersSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            const compare = yield bcrypt_1.default.compare(password.toString(), user.password);
            return compare;
        }
        catch (error) {
            logger_1.default.error(error);
        }
    });
};
UsersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            const hash = yield bcrypt_1.default.hash(user.password, 10);
            this.password = hash;
            const newCarro = new carrito_1.default({ userId: user._id, products: [] });
            yield newCarro.save();
            this.carritoId = newCarro._id.toString();
            next();
        }
        catch (error) {
            logger_1.default.error(error);
        }
    });
});
exports.User = mongoose_1.model('User', UsersSchema);
//# sourceMappingURL=user.js.map