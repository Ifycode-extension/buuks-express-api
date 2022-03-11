import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const [privateKey, publickey] = [
  `${process.env.PRIVATE_KEY}`,
  `${process.env.PUBLIC_KEY}`
];

export const signJwt = (payloadObject: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payloadObject, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publickey);
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (err) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    }
  }
}