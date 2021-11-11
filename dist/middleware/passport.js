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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const users_1 = require("../apis/users");
const user_1 = require("../models/users/DAOs/user");
const logger_1 = __importDefault(require("../config/logger"));
const validators_1 = require("../helpers/validators");
const LocalStrategy = passport_local_1.default.Strategy;
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};
const loginFunc = (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.UserAPI.query(email);
        if (!user) {
            return done(null, false, { message: 'User does not exist' });
        }
        if (!(yield users_1.UserAPI.validatePassword(email, password))) {
            return done(null, false, { message: 'Password is not valid.' });
        }
        return done(null, user);
    }
    catch (error) {
        logger_1.default.error(error);
    }
});
const signUpFunc = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield validators_1.schemaAuth.validateAsync(req.body);
        const image = req.file;
        if (!image) {
            return done(null, false, 'No envio ningun archivo');
        }
        const user = yield users_1.UserAPI.query(result.email);
        if (user) {
            return done(null, false, 'User already exists');
        }
        else {
            const imageUrl = image.path.replace("\\", "/");
            const userData = {
                email: result.email,
                password: result.password,
                nombre: result.nombre,
                direccion: result.direccion,
                edad: result.edad,
                telefono: result.telefono,
                foto: imageUrl
            };
            const newUser = yield users_1.UserAPI.addUser(userData);
            return done(null, newUser);
        }
    }
    catch (error) {
        if (error.isJoi === true)
            error.status = 422;
        logger_1.default.error(error);
        done(error);
    }
});
passport_1.default.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport_1.default.use('signup', new LocalStrategy(strategyOptions, signUpFunc));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => {
    user_1.ModelUser.findById(userId, function (err, user) {
        done(err, user);
    });
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map