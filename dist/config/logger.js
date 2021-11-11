"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { timestamp, combine, printf, errors, colorize } = winston_1.format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${message}`;
});
const warnFilter = winston_1.format(info => {
    return info.level.includes('warn') ? info : false;
});
const errorFilter = winston_1.format(info => {
    return info.level.includes('error') ? info : false;
});
const logger = winston_1.createLogger({
    format: combine(timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), colorize(), printf((info) => `${info.level} |  ${[info.timestamp]} | ${info.message}`)),
    transports: [
        new winston_1.transports.Console({ level: 'info' }),
        new winston_1.transports.File({
            filename: `${__dirname}/logs/error-2.log`,
            level: 'error',
            format: combine(errorFilter(), timestamp(), logFormat)
        }),
        new winston_1.transports.File({
            filename: `${__dirname}/logs/warn-2.log`,
            level: 'warn',
            format: combine(warnFilter(), timestamp(), logFormat)
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map