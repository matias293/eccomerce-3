"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else {
        res.status(401).json({
            msg: 'No estas autorizado',
        });
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map