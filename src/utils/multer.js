import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
export const fileObjects = {
  image: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "image/tiff",
    "image/vnd.microsoft.icon"
  ],
  
};
export const upload = ({filetype, folder}) => {
  const storage = diskStorage({
    destination: `missingfinder/${folder}`,
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, `${nanoid()}__${file.originalname}`);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (!filetype.includes(file.mimetype)) {
      return cb(new Error("in-valid file mimetype", { cause: 400 }), false);
    }
    return cb(null, true);
  };
  const multerUpload = multer({ storage, fileFilter });
  return multerUpload;
};
