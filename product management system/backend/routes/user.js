import express from 'express';
import userController from '../controllers/users.js';
const { signUp, signIn, resetPassword } = userController;
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/resetpassword', resetPassword);

export default router;