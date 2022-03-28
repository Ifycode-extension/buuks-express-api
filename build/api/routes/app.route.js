"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const app_controller_1 = require("../controllers/app.controller");
let router = express_1.default.Router();
exports.router = router;
router.get('/', app_controller_1.getAppController);
