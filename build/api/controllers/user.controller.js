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
exports.createUserController = void 0;
const lodash_1 = require("lodash");
const user_service_1 = require("../services/user.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUserService)(req.body);
        return res.status(201).json((0, lodash_1.omit)(user.toJSON(), 'password'));
    }
    catch (err) {
        return res.status(409).json({
            error: `${err}`
        });
    }
});
exports.createUserController = createUserController;
