"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const admin = true;
const checkAdmin = (req, res, next) => {
    if (admin)
        next();
    else {
        res.status(401).json({
            msg: 'No estas autorizado',
        });
    }
};
exports.checkAdmin = checkAdmin;
//# sourceMappingURL=admin.js.map