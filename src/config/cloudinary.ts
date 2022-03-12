import { NextFunction, Request, Response } from 'express';
import { default as cloud } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const { config, uploader } = cloud.v2;

const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
}

export { cloudinaryConfig, uploader };