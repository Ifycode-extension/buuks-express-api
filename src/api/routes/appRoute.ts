import express, { IRouter } from 'express';
import { getAppHandler } from '../controllers/app.controller';

let router: IRouter = express.Router();

router.get('/', getAppHandler);

export { router };
