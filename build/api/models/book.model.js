"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collectionName = 'book';
const BookSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    pdf: { type: String, required: true }
});
const BookModel = mongoose_1.default.model(collectionName, BookSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name
exports.BookModel = BookModel;
