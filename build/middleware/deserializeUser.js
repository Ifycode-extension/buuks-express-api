"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const session_service_1 = require("../api/services/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
// middleware for adding user to the req.body object in getUserSessionsController
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get access token from request headers (also remove the word 'Bearer' at the start of the auth token)
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    //console.log('decoded: ', decoded);
    if (decoded) { //  i.e. if there's valid JWT
        res.locals.user = decoded;
        return next();
    }
    // console.log('expired: ', expired);
    // console.log('refreshToken: ', refreshToken);
    // if access token is exprired and there's refresh token, reissue an access token
    if (expired && refreshToken) {
        const newAccessToken = yield (0, session_service_1.reIssueAccessToken)({ refreshToken });
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }
        const result = (0, jwt_utils_1.verifyJwt)(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }
    return next();
});
exports.default = deserializeUser;
