import express, { IRouter } from 'express';
import requireUser from '../../middleware/requireUser';
import { createSessionSchema } from '../../middleware/schema/session.schema';
import validateResource from '../../middleware/validate';
import {
  createSessionControllerHandler,
  deleteUserSessionControllerHandler,
  getUserSessionsControllerHandler
} from '../controllers/session.controller';

let router: IRouter = express.Router();

router.post('/', validateResource(createSessionSchema), createSessionControllerHandler);
router.get('/', requireUser, getUserSessionsControllerHandler);
router.delete('/', requireUser, deleteUserSessionControllerHandler);

export { router };