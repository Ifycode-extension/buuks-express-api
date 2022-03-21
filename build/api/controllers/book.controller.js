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
exports.deleteBookController = exports.updateBookController = exports.getOneBookController = exports.createBookController = exports.getBooksForEachUserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_service_1 = require("../services/book.service");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = require("../../middleware/multer");
const cloudinary_1 = require("../../config/cloudinary");
dotenv_1.default.config();
let bookItem = 'book';
let routeName = `${bookItem}s`;
const getBooksForEachUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.params.userId);
        const user = yield (0, book_service_1.getUserByIdService)(userId);
        if (user) {
            const docs = yield (0, book_service_1.getBooksService)({ user: req.params.userId });
            return res.status(200).json({
                count: docs.length,
                description: `List of books uploaded by user: ${user.name}, user ID: ${req.params.userId}`,
                books: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        pdf: doc.pdf,
                        request: {
                            type: 'GET',
                            url: `${process.env.API_HOST_URL}/${routeName}/${doc._id}`,
                            description: `Get this single ${bookItem} by ID at the above url`
                        }
                    };
                })
            });
        }
        else {
            return res.status(404).json({
                message: 'No user record found for provided ID'
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: 'Invalid user ID',
            error: `${err}`
        });
    }
});
exports.getBooksForEachUserController = getBooksForEachUserController;
const createBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = res.locals.user.name;
        const userId = res.locals.user._id;
        // TODO: extract any cloudinary upload code to a separate service for reuse, and just call the service when needed
        // TODO: create and/or specify separate folder to upload PDF to on cloudinary (per user)
        if (req.file) {
            // console.log('file: ', req.file);
            const file = (0, multer_1.dataUri)(req).content;
            // console.log(file)
            return cloudinary_1.uploader.upload(file).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                // console.log(result)
                const pdf = result.url;
                const body = Object.assign({ pdf }, req.body);
                // console.log('body: ', body);
                //-----------------------------------------------------
                const doc = yield (0, book_service_1.createBookService)(Object.assign(Object.assign({}, body), { user: userId }));
                return res.status(201).json({
                    message: `New ${bookItem} created successfully!`,
                    user: {
                        name: userName,
                        _id: userId,
                    },
                    book: {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        pdf: doc.pdf,
                        user: doc.user,
                        request: {
                            type: 'GET',
                            url: `${process.env.API_HOST_URL}/${routeName}/${doc._id}`,
                            description: `Get this single ${bookItem} by ID at the above url`
                        }
                    }
                });
                //-----------------------------------------------------
            })).catch((err) => res.status(400).json({
                message: 'something went wrong while processing your request',
                data: {
                    err
                }
            }));
        }
    }
    catch (err) {
        res.status(409).json({
            error: `${err}`
        });
    }
});
exports.createBookController = createBookController;
const getOneBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = new mongoose_1.default.Types.ObjectId(req.params.bookId);
        const doc = yield (0, book_service_1.getOneBookService)(bookId);
        if (doc) {
            return res.status(200).json({
                _id: doc._id,
                title: doc.title,
                description: doc.description,
                pdf: doc.pdf,
                user: doc.user,
                request: {
                    type: 'GET',
                    url: `${process.env.API_HOST_URL}/${routeName}`,
                    description: `Get the list of all ${bookItem}s for this user at the above url`,
                }
            });
        }
        else {
            return res.status(404).json({
                message: 'No record found for provided ID'
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: 'Invalid ID',
            error: `${err}`
        });
    }
});
exports.getOneBookController = getOneBookController;
const updateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = res.locals.user.name;
        const userId = res.locals.user._id;
        const bookId = new mongoose_1.default.Types.ObjectId(req.params.bookId);
        const book = yield (0, book_service_1.getOneBookService)(bookId);
        if (!book) {
            return res.status(404).json({
                message: 'No record found for provided ID'
            });
        }
        if (book.user.toString() !== userId) {
            return res.status(403).json({
                message: `Only the book\'s owner is authorized to perform this operation. One loggedin user is not permitted to update another user\'s book, supply the bookID for any of the books you created. Find your books with their bookIDs at: GET /books/user/${userId}`,
                error: 'Forbidden'
            });
        }
        // TODO: Not only in DB. On Cloudinary, update should replace the previous PDF file attached to this book id
        if (req.file) {
            // console.log('file: ', req.file);
            const file = (0, multer_1.dataUri)(req).content;
            // console.log(file)
            return cloudinary_1.uploader.upload(file).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                // console.log(result)
                const pdf = result.url;
                const body = Object.assign({ pdf }, req.body);
                // console.log('body: ', body);
                //-----------------------------------------------------
                yield (0, book_service_1.updateBookservice)(bookId, body, { new: true });
                res.status(200).json({
                    message: `${bookItem} updated successfully!`,
                    user: {
                        name: userName,
                        _id: userId,
                    },
                    request: {
                        type: 'GET',
                        url: `${process.env.API_HOST_URL}/${routeName}/${bookId.toString()}`,
                        description: `Get this single ${bookItem} by ID at the above url`
                    }
                });
                //-----------------------------------------------------
            })).catch((err) => res.status(400).json({
                message: 'something went wrong while processing your request',
                data: {
                    err
                }
            }));
        }
    }
    catch (err) {
        res.status(500).json({
            message: `Error updating ${bookItem}`,
            error: `${err}`
        });
    }
});
exports.updateBookController = updateBookController;
const deleteBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = res.locals.user.name;
        const userId = res.locals.user._id;
        const bookId = new mongoose_1.default.Types.ObjectId(req.params.bookId);
        const book = yield (0, book_service_1.getOneBookService)(bookId);
        if (!book) {
            return res.status(404).json({
                message: 'No record found for provided ID'
            });
        }
        if (book.user.toString() !== userId) {
            return res.status(403).json({
                message: `Only the book\'s owner is authorized to perform this operation. One loggedin user is not permitted to delete another user\'s book, supply the bookID for any of the books you created. Find your books with their bookIDs at: GET /books/user/${userId}`,
                error: 'Forbidden'
            });
        }
        // TODO: Not only in DB. On Cloudinary, delete PDF file attached to this book id
        yield (0, book_service_1.deleteBookService)(bookId);
        res.status(200).json({
            message: `${bookItem} deleted successfully!`,
            user: {
                name: userName,
                _id: userId,
            },
            request: {
                type: 'POST',
                url: `${process.env.API_HOST_URL}/${routeName}`,
                description: `Create a new ${bookItem} at the above url`
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: `Error deleting ${bookItem}`,
            error: `${err}`
        });
    }
});
exports.deleteBookController = deleteBookController;
