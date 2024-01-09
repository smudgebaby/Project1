import { Router } from 'express';
import { signUp, signIn, resetPassword } from '../controllers/users';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/resetpassword', resetPassword);

export default router;