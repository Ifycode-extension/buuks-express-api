"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Based on and for use with the zod config inside validate.ts
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        password: (0, zod_1.string)({
            required_error: 'Password is required'
        }).min(8, 'Password is too short - 8 characters minimum'),
        passwordConfirmation: (0, zod_1.string)({ required_error: 'Password confirmation is required' }),
        email: (0, zod_1.string)({
            required_error: 'Name is required'
        }).email('Not a valid email'),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    }),
});
