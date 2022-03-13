import express, { IRouter } from 'express';
import { createUserSchema } from '../../middleware/schema/user.schema';
import validateResource from '../../middleware/validate';
import { createUserController } from '../controllers/user.controller';

let router: IRouter = express.Router();

router.post('/signup', validateResource(createUserSchema), createUserController);

export { router };