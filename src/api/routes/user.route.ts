import express, { IRouter } from 'express';
import { createUserControllerHandler } from '../controllers/user.controller';

let router: IRouter = express.Router();

router.post('/', createUserControllerHandler);

export { router };