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
exports.deleteBookService = exports.updateBookservice = exports.getOneBookService = exports.createBookService = exports.getUserByIdService = exports.getBooksService = void 0;
const book_model_1 = require("../models/book.model");
const user_model_1 = require("../models/user.model");
const getBooksService = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield book_model_1.BookModel.find(filter);
    return query;
});
exports.getBooksService = getBooksService;
const getUserByIdService = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    const finduserbyid = user_model_1.UserModel.findById(query, {}, options);
    return finduserbyid;
});
exports.getUserByIdService = getUserByIdService;
const createBookService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const save = book_model_1.BookModel.create(input);
    return save;
});
exports.createBookService = createBookService;
const getOneBookService = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    const findbyid = book_model_1.BookModel.findById(query, {}, options);
    return findbyid;
});
exports.getOneBookService = getOneBookService;
const updateBookservice = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    const findbyidandupdate = book_model_1.BookModel.findByIdAndUpdate(query, update, options);
    return findbyidandupdate;
});
exports.updateBookservice = updateBookservice;
const deleteBookService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteone = yield book_model_1.BookModel.findByIdAndDelete(query);
    return deleteone;
});
exports.deleteBookService = deleteBookService;
