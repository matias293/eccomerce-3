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
exports.authController = void 0;
const moment_1 = __importDefault(require("moment"));
const index_1 = __importDefault(require("../config/index"));
const ethereal_1 = require("../services/ethereal");
class Auth {
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const { nombre } = req.user;
                res.json({ message: ` Bienvenido ${nombre}!` });
            }
        });
    }
    postSignUp(req, res) {
        if (req.user) {
            const { email } = req.user;
            const destination = index_1.default.ETHEREAL_EMAIL;
            const subject = 'Nuevo Registo';
            const content = `
        <p> El usuario ${email} creo un usuario  ${moment_1.default().format('DD/MM/YYYY HH:mm:ss')} </p>
        `;
            ethereal_1.EmailServiceEthereal.sendEmail(destination, subject, content);
        }
        res.json({ message: ` Usuario creado correctamente` });
    }
    postLogOut(req, res) {
        if (!req.isAuthenticated()) {
            return res.json({ message: 'Usted no se encuentra logeado' });
        }
        req.session.destroy(err => {
            if (err)
                res.status(500).json({ message: 'Hubo un error al cerrar sesion' });
            else {
                res.json({ message: 'Se cerró su sesion correctmanete' });
            }
        });
    }
}
exports.authController = new Auth();
//# sourceMappingURL=auth.js.map