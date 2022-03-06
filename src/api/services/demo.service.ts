import { Request, Response } from 'express';
import { DemoModel as Demo } from '../models/demo.model';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getDemoItems = async (req: Request, res: Response) => {
  Demo.find()
    .select('_id name age')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            age: doc.age,
            request: {
              type: 'GET',
              url: `http://localhost:3000/${routeName}/${doc._id}`
            }
          }
        })
      };
      res.status(200).json(response);
      //console.log( chalk.greenBright(`\nGET request successful! \n\nRunning at http://localhost:3000/${routeName}/\n`) );
    })
    .catch(err => {
      res.status(500).json({
        error: `${err}`
      });
      //console.log( chalk.redBright(`\nError retriving ${item}s: ${err}\n`) );
    });
}