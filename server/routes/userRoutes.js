import express from 'express';
const router = express.Router();
import { authUser, registerUser, verifyEmail, forgotPassword, resetPassword, authGoogleAuth } from '../controllers/userController.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
router.post('/verify', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/google-auth', authGoogleAuth);

export default router;
