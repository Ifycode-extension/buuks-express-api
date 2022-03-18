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
exports.findUserService = exports.validatePasswordService = exports.createUserService = void 0;
const lodash_1 = require("lodash");
const user_model_1 = require("../models/user.model");
const createUserService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield user_model_1.UserModel.create(input);
    return query;
});
exports.createUserService = createUserService;
const validatePasswordService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user)
        return false;
    const isValid = yield user.comparePassword(password);
    if (!isValid)
        return false;
    return (0, lodash_1.omit)(user.toJSON(), 'password');
});
exports.validatePasswordService = validatePasswordService;
const findUserService = (query) => {
    return user_model_1.UserModel.findOne(query).lean();
};
exports.findUserService = findUserService;
