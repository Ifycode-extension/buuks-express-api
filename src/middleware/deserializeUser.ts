import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../api/services/session.service';
import { verifyJwt } from '../utils/jwt.utils';

// middleware for adding user to the req.body object in getUserSessionsControllerHandler
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

  // get access token from request headers (also remove the word 'Bearer' at the start of the auth token)
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  //console.log('decoded: ', decoded);

  if (decoded) { //  i.e. if there's valid JWT
    res.locals.user = decoded;
    return next();
  }

  console.log('expired: ', expired);
  console.log('refreshToken: ', refreshToken);

  // if access token is exprired and there's refresh token, reissue an access token
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
}

export default deserializeUser;