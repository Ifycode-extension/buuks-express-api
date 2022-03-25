"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app_route_1 = require("./api/routes/app.route");
const user_route_1 = require("./api/routes/user.route");
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
app.use((0, cors_1.default)({ origin: `${process.env.CLIENT_HOST_URL}` }));
app.use('*', cloudinary_1.cloudinaryConfig);
// Ensures deserializeUser middleware is called on every single route
app.use(deserializeUser_1.default);
//==== endpoint routers ====
app.use('/', app_route_1.router);
app.use('/users', user_route_1.router);
app.use('/books', book_route_1.router);
app.use((req, res, next) => {
    const err = new Error('Not found!');
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
