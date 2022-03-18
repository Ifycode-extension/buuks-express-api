"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// middleware for validating that user exists (getUserSessionsController & deserializeUser)
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    // console.log('user: ', user);
    if (!user) {
        return res.status(403).json({
            message: 'You are Logged out. Please sign in to your account to continue',
            error: 'Forbidden'
        });
    }
    return next();
};
exports.default = requireUser;
