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
exports.SmsService = void 0;
const twilio_1 = __importDefault(require("twilio"));
const logger_1 = __importDefault(require("../config/logger"));
const config_1 = __importDefault(require("../config"));
class Twilio {
    constructor() {
        this.twilio = twilio_1.default(config_1.default.TWILIO_ACCOUNT_ID, config_1.default.TWILIO_TOKEN);
    }
    sendMessage(cellphoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: config_1.default.TWILIO_CELLPHONE,
                to: cellphoneNumber,
            };
            yield this.twilio.messages.create(params);
            logger_1.default.info('Sms enviado');
            return;
        });
    }
    sendMessageWhatsapp(cellphoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: `whatsapp:${config_1.default.TWILIO_CELLPHONE}`,
                to: `whatsapp:${cellphoneNumber}`,
            };
            yield this.twilio.messages.create(params);
            logger_1.default.info('Whatsapp enviado');
            return;
        });
    }
}
exports.SmsService = new Twilio();
//# sourceMappingURL=twilio.js.map