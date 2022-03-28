"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateResource = (schema) => (req, res, next) => {
    try {
        // console.log("Validate this request body: ", req.body)
        // console.log("Validate this file: ", req.file)
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
            file: req.file
        });
        next();
    }
    catch (err) {
        // console.log('req error: ', req.body);
        return res.status(400).send(err.errors);
    }
};
exports.default = validateResource;
// TODO: reformat the function returning a function so that it looks a bit different
// TODO: Is it possiible to use .json() instead of .send() in the catch block?
