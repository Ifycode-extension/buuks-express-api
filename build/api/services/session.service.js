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
exports.reIssueAccessToken = exports.updateUserSessionService = exports.getUserSessionsService = exports.createSessionService = void 0;
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../../utils/jwt.utils");
const session_model_1 = require("../models/session.model");
const user_service_1 = require("./user.service");
const createSessionService = (userId, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield session_model_1.SessionModel.create({
        user: userId,
        userAgent
    });
    return session.toJSON();
});
exports.createSessionService = createSessionService;
// find sessions
const getUserSessionsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield session_model_1.SessionModel.find(query).lean();
});
exports.getUserSessionsService = getUserSessionsService;
// (used inside delete controller)
const updateUserSessionService = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    //deleteOne works instead of updateOne
    return session_model_1.SessionModel.deleteOne(query, update);
});
exports.updateUserSessionService = updateUserSessionService;
// used inside deserializeUser file
const reIssueAccessToken = ({ refreshToken }) => __awaiter(void 0, void 0, void 0, function* () {
    const { decoded } = (0, jwt_utils_1.verifyJwt)(refreshToken);
    if (!decoded || !(0, lodash_1.get)(decoded, 'session'))
        return false;
    const session = yield session_model_1.SessionModel.findById((0, lodash_1.get)(decoded, 'session'));
    // if (!session || !session.valid) return false; (removing !session.valid from the if statement fixed the issue)
    if (!session)
        return false;
    const user = yield (0, user_service_1.findUserService)({ _id: session.user });
    if (!user)
        return false;
    // create an access token
    const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: `${process.env.ACCESSTOKEN_TTL}` } // will live for the duration of e.g. minutes specified in the .env file
    );
    return accessToken;
});
exports.reIssueAccessToken = reIssueAccessToken;
