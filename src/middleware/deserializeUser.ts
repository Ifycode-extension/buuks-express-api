import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';

// middleware for adding user to the req.body object in getUserSessionsControllerHandler
const deserializeUser = (req: Request, res: Response, next: NextFunction) => {

  // get access token from request headers (also remove the word 'Bearer' at the start of the auth token)
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  //console.log('decoded: ', decoded);

  if (decoded) { //  i.e. if there's valid JWT
    res.locals.user = decoded;
    return next();
  }

  return next();
}

export default deserializeUser;