"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// middleware for validating that user exists (getUserSessionsController & deserializeUser)
const requireUser = (req, res, next) => {
    const user = res.locals ? res.locals.user : null;
    // console.log('res: ', res);
    // console.log('user: ', user);
    if (!user) {
        return res.status(401).json({
            message: 'You are Logged out. Please sign in to your account to continue',
            error: 'Unauthorized'
        });
    }
    return next();
};
exports.default = requireUser;
