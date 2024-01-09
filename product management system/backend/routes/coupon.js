import express from 'express';
const router = express.Router();
import couponController from '../controllers/coupons.js';

router.post('/create', couponController.createCoupon);
router.get('/getAll', couponController.getAllCoupons);
router.get('/getByCode/:code', couponController.getCoupon);
router.post('/update/:code', couponController.updateCoupon);
router.delete('/delete/:code', couponController.deleteCoupon);

export default router;
