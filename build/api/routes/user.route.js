"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_schema_1 = require("../../middleware/schema/user.schema");
const validate_1 = __importDefault(require("../../middleware/validate"));
const user_controller_1 = require("../controllers/user.controller");
let router = express_1.default.Router();
exports.router = router;
router.post('/signup', (0, validate_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserController);
