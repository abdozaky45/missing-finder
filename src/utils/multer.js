import multer, {diskStorage} from 'multer';
export const fileObjects = {
  image: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml',
    'image/tiff',
    'image/vnd.microsoft.icon',
  ],
};
export const uploadCloud = fileObjects => {
  const fileFilter = (req, file, cb) => {
    if (!fileObjects.includes (file.mimetype)) {
      return cb (new Error ('in-valid file mimetype', {cause: 400}), false);
    }
    return cb (null, true);
  };
  //storage : diskStorage({}) by default save  file in folder "temp"
  const multerUpload = multer ({storage: diskStorage ({}), fileFilter});
  return multerUpload;
};
