import { Request, Response } from 'express';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getAppHandler = async (req: Request, res: Response) => {
  try {
    //let demo = await getDemoItems();
    res.status(200).send('yay!');
    //return demo;
    console.log(`\nGET request successful! \n\nRunning at http://localhost:3000/${routeName}/\n`);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}