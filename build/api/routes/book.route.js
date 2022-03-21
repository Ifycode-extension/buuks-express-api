"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../middleware/multer");
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const book_schema_1 = require("../../middleware/schema/book.schema");
const validate_1 = __importDefault(require("../../middleware/validate"));
const book_controller_1 = require("../controllers/book.controller");
let router = express_1.default.Router();
exports.router = router;
router.post('/', requireUser_1.default, multer_1.multerUploadsMiddleware, (0, validate_1.default)(book_schema_1.createBookSchema), (0, validate_1.default)(book_schema_1.uploadBookSchema), book_controller_1.createBookController);
router.get('/user/:userId', book_controller_1.getBooksForEachUserController);
router.get('/:bookId', (0, validate_1.default)(book_schema_1.getOneBookSchema), book_controller_1.getOneBookController);
router.put('/:bookId', requireUser_1.default, multer_1.multerUploadsMiddleware, (0, validate_1.default)(book_schema_1.updateBookSchema), (0, validate_1.default)(book_schema_1.uploadBookSchema), book_controller_1.updateBookController);
router.delete('/:bookId', requireUser_1.default, (0, validate_1.default)(book_schema_1.deleteBookSchema), book_controller_1.deleteBookController);
