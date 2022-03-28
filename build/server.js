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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connect_1 = __importDefault(require("./db.connect"));
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`\nServer running at ${process.env.API_HOST_URL}`);
        yield (0, db_connect_1.default)();
    }
    catch (err) {
        console.log(err);
    }
}));
// Chalk import and usage is what causes the import error
// Also had to use node v16 (was using v14 before - not sure if this is a cause of the issue though...)
