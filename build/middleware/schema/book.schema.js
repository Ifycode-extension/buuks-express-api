"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookSchema = exports.updateBookSchema = exports.getOneBookSchema = exports.uploadBookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
// Based on and for use with the zod config inside validate.ts
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Title is required'
        }),
        description: (0, zod_1.string)({
            required_error: 'Description is required'
        }).min(10, 'Description should be at least 10 characters long'),
    }),
};
const file_payload = {
    file: (0, zod_1.object)({
        fieldname: (0, zod_1.string)({
            required_error: 'Field name is required'
        }),
        originalname: (0, zod_1.string)({
            required_error: 'Original file name is required'
        }),
        size: (0, zod_1.number)({
            required_error: 'File size should be greater than 1 bytes'
        }).min(1),
        mimetype: (0, zod_1.string)({
            required_error: 'File mimetype is required and should be of type application/pdf'
        })
    }).refine(data => data.mimetype === 'application/pdf', {
        message: 'File must be a pdf file',
        path: ['mimetype']
    }),
};
const params = {
    params: (0, zod_1.object)({
        bookId: (0, zod_1.string)({
            required_error: 'bookId is required'
        }),
    }),
};
exports.createBookSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.uploadBookSchema = (0, zod_1.object)(Object.assign({}, file_payload));
exports.getOneBookSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateBookSchema = (0, zod_1.object)(Object.assign(Object.assign(Object.assign({}, payload), file_payload), params));
exports.deleteBookSchema = (0, zod_1.object)(Object.assign({}, params));
