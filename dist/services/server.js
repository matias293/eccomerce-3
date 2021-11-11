"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http = __importStar(require("http"));
const index_1 = __importDefault(require("../routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config"));
const StoreOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl: config_1.default.MONGO_INGRESS,
    }),
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: config_1.default.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
    },
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuid_1.v4() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const app = express_1.default();
app.use(compression_1.default());
app.use(express_session_1.default(StoreOptions));
app.use(multer_1.default({ storage, fileFilter }).single('image'));
app.use(cookie_parser_1.default());
app.use(express_session_1.default());
const publicFolderPath = path_1.default.resolve(__dirname, '../../public');
app.use(express_1.default.static(publicFolderPath));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api', index_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../images')));
const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.send({
        error: {
            status: error.statusCode || 500,
            message: error.message,
        },
    });
};
app.use(errorHandler);
const myServer = new http.Server(app);
exports.default = myServer;
//# sourceMappingURL=server.js.map