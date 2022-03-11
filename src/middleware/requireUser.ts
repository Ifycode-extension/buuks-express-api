import { NextFunction, Request, Response } from 'express';

// middleware for validating that user exists (getUserSessionsControllerHandler & deserializeUser)
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  // console.log('user: ', user);

  if (!user) {
    return res.sendStatus(403);
  }

  return next();

}

export default requireUser;