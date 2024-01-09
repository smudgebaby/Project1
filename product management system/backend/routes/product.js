import express from 'express';
const router = express.Router();
import productsController from '../controllers/products.js';
const {createProduct, getAllProducts, getProduct, updateProduct} = productsController;

router.post('/create', createProduct);
router.get('/getById/:id', getProduct);
router.get('/getAll', getAllProducts);
router.post('/update/:id', updateProduct);

export default router;