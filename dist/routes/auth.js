"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("../middleware/passport"));
const router = express_1.Router();
router.post('/login', passport_1.default.authenticate('login'), express_async_handler_1.default(auth_1.authController.postLogin));
router.post('/signup', passport_1.default.authenticate('signup'), express_async_handler_1.default(auth_1.authController.postSignUp));
router.post('/logout', express_async_handler_1.default(auth_1.authController.postLogOut));
exports.default = router;
//# sourceMappingURL=auth.js.map