import { DocumentDefinition } from 'mongoose';
import { DemoDocument, DemoModel as Demo } from '../models/demo.model';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getDemoItems = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
}

export const createDemoItem = async (requestBody: DocumentDefinition<DemoDocument>) => {
  let demo = new Demo({
    name: requestBody.name,
    age: requestBody.age
  });

  const save = await demo.save();
  return save;
}