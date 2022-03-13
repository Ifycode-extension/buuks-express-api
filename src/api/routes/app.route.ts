import express, { IRouter } from 'express';
import { getAppController } from '../controllers/app.controller';

let router: IRouter = express.Router();

router.get('/', getAppController);

export { router };
