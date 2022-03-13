import express, { IRouter } from 'express';
import { getApp } from '../controllers/app.controller';

let router: IRouter = express.Router();

router.get('/', getApp);

export { router };
