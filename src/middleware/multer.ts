import multer from 'multer';
import DatauriParser from 'datauri/parser';
import path from 'path';

const storage = multer.memoryStorage();

const multerUploadsMiddleware = multer({ storage }).single('pdf');

const dUri = new DatauriParser();

const dataUri = (req: any) => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploadsMiddleware, dataUri };