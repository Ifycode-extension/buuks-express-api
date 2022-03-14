"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
// import cors from 'cors';
const app_route_1 = require("./api/routes/app.route");
const user_route_1 = require("./api/routes/user.route");
const session_route_1 = require("./api/routes/session.route");
const book_route_1 = require("./api/routes/book.route");
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const cloudinary_1 = require("./config/cloudinary");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use(express_1.default.json());
//app.use(cors({ origin: `http://localhost:${process.env.CLIENT_PORT}` }));
app.use('*', cloudinary_1.cloudinaryConfig);
// Ensures deserializeUser middleware is called on every single route
app.use(deserializeUser_1.default);
//==== endpoint routers ====
app.use('/', app_route_1.router);
app.use('/users', user_route_1.router);
app.use('/auth', session_route_1.router);
app.use('/books', book_route_1.router);
app.use((req, res, next) => {
    const err = new Error('Route not found!');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});
