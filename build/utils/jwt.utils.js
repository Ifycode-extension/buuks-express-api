"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const [privateKey, publickey] = [
    `${process.env.PRIVATE_KEY}`,
    `${process.env.PUBLIC_KEY}`
];
const signJwt = (payloadObject, options) => {
    return jsonwebtoken_1.default.sign(payloadObject, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publickey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (err) {
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null
        };
    }
};
exports.verifyJwt = verifyJwt;
