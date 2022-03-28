"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collectionName = 'session';
const SessionSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    password: { type: Boolean, default: true },
    userAgent: { type: String }
}, {
    timestamps: true
});
const SessionModel = mongoose_1.default.model(collectionName, SessionSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name
exports.SessionModel = SessionModel;
