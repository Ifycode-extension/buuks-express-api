import express, { IRouter } from 'express';
import validateResource from '../../middleware/validate';
import requireUser from '../../middleware/requireUser';
import { createSessionSchema } from '../../middleware/schema/session.schema';
import {
  createSessionControllerHandler,
  deleteUserSessionControllerHandler,
  getUserSessionsControllerHandler
} from '../controllers/session.controller';

let router: IRouter = express.Router();

router.post('/login', validateResource(createSessionSchema), createSessionControllerHandler);
router.get('/sessions', requireUser, getUserSessionsControllerHandler);
router.delete('/sessions', requireUser, deleteUserSessionControllerHandler);

export { router };