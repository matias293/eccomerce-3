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
exports.EmailService = void 0;
const config_1 = __importDefault(require("../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("../config/logger"));
class Email {
    constructor() {
        this.owner = {
            name: config_1.default.GMAIL_NAME || '',
            address: config_1.default.GMAIL_EMAIL || '',
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config_1.default.GMAIL_EMAIL,
                pass: config_1.default.GMAIL_PASSWORD,
            },
        });
        this.transporter.verify().then();
    }
    sendEmail(dest, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.owner,
                to: dest,
                subject,
                html: content
            };
            yield this.transporter.sendMail(mailOptions);
            logger_1.default.info('Email enviado');
            return;
        });
    }
}
exports.EmailService = new Email();
//# sourceMappingURL=gmail.js.map