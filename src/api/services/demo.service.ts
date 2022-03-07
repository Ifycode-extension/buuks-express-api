import { Request, Response } from 'express';
import { DemoModel as Demo } from '../models/demo.model';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getDemoItems = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
}