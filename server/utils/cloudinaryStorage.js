import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'onlyfollowers',
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'webm','doc','pdf'],
    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
  },
});

const upload = multer({ storage: storage });

export default upload;
