import express from 'express';
const router = express.Router();
import { authUser, registerUser, verifyEmail, forgotPassword, resetPassword } from '../controllers/userController.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
router.post('/verify', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
