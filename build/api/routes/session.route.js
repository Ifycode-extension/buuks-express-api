"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../../middleware/validate"));
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const session_schema_1 = require("../../middleware/schema/session.schema");
const session_controller_1 = require("../controllers/session.controller");
let router = express_1.default.Router();
exports.router = router;
router.post('/login', (0, validate_1.default)(session_schema_1.createSessionSchema), session_controller_1.createSessionController);
router.get('/sessions', requireUser_1.default, session_controller_1.getUserSessionsController);
router.delete('/sessions', requireUser_1.default, session_controller_1.deleteUserSessionController);
