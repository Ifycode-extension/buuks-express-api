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
exports.deleteUserSessionController = exports.getUserSessionsController = exports.createSessionController = void 0;
const jwt_utils_1 = require("../../utils/jwt.utils");
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const createSessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate the user's password
    const user = yield (0, user_service_1.validatePasswordService)(req.body);
    if (!user) {
        return res.status(401).json({
            error: {
                message: 'Invalid email or password'
            }
        });
    }
    // create a session
    const session = yield (0, session_service_1.createSessionService)(user._id, req.get('user-agent') || '');
    try {
        // create an access token
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: `${process.env.ACCESSTOKEN_TTL}` } // will live for the duration of e.g. minutes specified in the .env file
        );
        // create an refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: `${process.env.REFRESHTOKEN_TTL}` } // will live for the duration of e.g. year specified in the .env file
        );
        //return access and refresh token
        return res.status(200).json({
            user: {
                name: user.name,
                _id: user._id
            },
            accessToken,
            refreshToken
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});
exports.createSessionController = createSessionController;
const getUserSessionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    // console.log('userId: ', userId);
    const sessions = yield (0, session_service_1.getUserSessionsService)({ user: userId, valid: true });
    // console.log('Sessions: ', sessions);
    return res.status(200).json({
        count: sessions.length,
        sessions: sessions
    });
});
exports.getUserSessionsController = getUserSessionsController;
const deleteUserSessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = res.locals.user.session;
    // set valid (for a session) to false so that user is not able to reuse that session
    yield (0, session_service_1.updateUserSessionService)({ _id: sessionId }, { valid: false });
    // console.log(test);
    return res.status(200).json({
        accessToken: null,
        refreshToken: null,
    });
});
exports.deleteUserSessionController = deleteUserSessionController;
