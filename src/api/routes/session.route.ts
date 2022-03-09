import express, { IRouter } from 'express';
import { createSessionSchema } from '../../middleware/schema/session.schema';
import validateResource from '../../middleware/validate';
import { createSessionControllerHandler } from '../controllers/session.controller';

let router: IRouter = express.Router();

router.post('/', validateResource(createSessionSchema), createSessionControllerHandler);

export { router };