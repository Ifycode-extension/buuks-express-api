import express, { IRouter } from 'express';
import { createUserSchema } from '../../middleware/schema/user.schema';
import validateResource from '../../middleware/validate';
import { createUserControllerHandler } from '../controllers/user.controller';

let router: IRouter = express.Router();

router.post('/signup', validateResource(createUserSchema), createUserControllerHandler);

export { router };