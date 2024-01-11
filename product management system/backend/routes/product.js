import express from 'express';
const router = express.Router();
import productsController from '../controllers/products.js';
const {createProduct, getAllProducts, getProduct, updateProduct, getPage} = productsController;

router.post('/create', createProduct);
router.get('/getById/:id', getProduct);
router.get('/getAll', getAllProducts);
router.post('/update/:id', updateProduct);
router.get('/page/:page/:sort', getPage);

export default router;