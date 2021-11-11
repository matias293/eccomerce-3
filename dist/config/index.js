"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 8080,
    MONGO_INGRESS: process.env.MONGODbas_INGRESS || 'mongodbaas',
    MONGOLOCAL_INGRESS: process.env.MONGOLOCAL_INGRESS || 'mongolocal',
    SESSION_SECRET: process.env.SESSION_SECRET || 'Elsecreto',
    GMAIL_NAME: process.env.GMAIL_NAME || 'nombre',
    GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'mail',
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
    TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
    TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || 'twiloCellphone',
    ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'etherealName',
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'etherealEmail',
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'etherealPassword',
    SESSION_COOKIE_TIMEOUT_MIN: parseInt(process.env.SESSION_COOKIE_TIMEOUT_MIN || '10'),
};
//# sourceMappingURL=index.js.map