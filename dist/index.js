"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const minimist_1 = __importDefault(require("minimist"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const server_1 = __importDefault(require("./services/server"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./config/logger"));
const argumentos = minimist_1.default(process.argv.slice(2));
exports.PORT = argumentos.puerto || config_1.default.PORT || 8080;
const clusterMode = argumentos.cluster;
const numCPUs = os_1.default.cpus().length;
if (clusterMode && cluster_1.default.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        cluster_1.default.fork();
    });
}
else {
    server_1.default.listen(exports.PORT, () => logger_1.default.info(`Servidor express escuchando en el puerto ${exports.PORT} - PID WORKER ${process.pid}`));
}
//# sourceMappingURL=index.js.map