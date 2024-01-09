import express from 'express';
import connectDB from './db/index.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import couponRouter from './routes/coupon.js';
const index = express();
import 'dotenv';
import {config} from 'dotenv';

config();
connectDB();

index.use(express.urlencoded({ extended: false }));
index.use(express.json());

index.use('/user', userRouter);

index.use('/product', productRouter);

index.use('/coupon', couponRouter);

index.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});