import express, { IRouter } from 'express';
import validateResource from '../../middleware/validate';
import requireUser from '../../middleware/requireUser';
import { createSessionSchema } from '../../middleware/schema/session.schema';
import {
  createSessionController,
  deleteUserSessionController,
  getUserSessionsController
} from '../controllers/session.controller';

let router: IRouter = express.Router();

router.post('/login', validateResource(createSessionSchema), createSessionController);
router.get('/sessions', requireUser, getUserSessionsController);
router.delete('/sessions', requireUser, deleteUserSessionController);

export { router };