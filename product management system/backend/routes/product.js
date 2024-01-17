import express from 'express';
import multer from 'multer';
import * as path from 'path';

const router = express.Router();
import productsController from '../controllers/products.js';
const {createProduct, getAllProducts, getProduct, updateProduct, getPage} = productsController;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/');
  },
  filename: function (req, file, cb) {
    const match = {
      'image/png': '.png',
      'image/jpeg': '.jpg',
    };

    const ext = match[file.mimetype];
    if (ext) {
      cb(null, file.fieldname + '-' + Date.now() + ext);
    } else {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }
});


const upload = multer({ storage: storage });


router.post('/create', upload.single('image'), createProduct);
router.get('/getById/:id', getProduct);
router.get('/getAll', getAllProducts);
router.post('/update/:id', upload.single('image'), updateProduct);
router.get('/page/:page/:sort/:info', getPage);

export default router;