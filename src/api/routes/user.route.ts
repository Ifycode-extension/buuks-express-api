import express, { IRouter } from 'express';
import { createUserSchema } from '../../middleware/schema/user.schema';
import validateResource from '../../middleware/validate';
import { createUserController } from '../controllers/user.controller';
import requireUser from '../../middleware/requireUser';
import { createSessionSchema } from '../../middleware/schema/session.schema';
import {
  createSessionController,
  deleteUserSessionController,
  getUserSessionsController
} from '../controllers/session.controller';

let router: IRouter = express.Router();

router.post('/signup', validateResource(createUserSchema), createUserController);
router.post('/login', validateResource(createSessionSchema), createSessionController);
router.get('/sessions', requireUser, getUserSessionsController);
router.delete('/sessions', requireUser, deleteUserSessionController);

export { router };