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
exports.EmailServiceEthereal = void 0;
const index_1 = __importDefault(require("../config/index"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor() {
        this.owner = {
            name: index_1.default.ETHEREAL_NAME,
            address: index_1.default.ETHEREAL_EMAIL,
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: index_1.default.ETHEREAL_EMAIL,
                pass: index_1.default.ETHEREAL_PASSWORD,
            },
        });
    }
    sendEmail(dest, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.owner,
                to: dest,
                subject,
                html: content,
            };
            const response = yield this.transporter.sendMail(mailOptions);
            return response;
        });
    }
}
exports.EmailServiceEthereal = new Email();
//# sourceMappingURL=ethereal.js.map