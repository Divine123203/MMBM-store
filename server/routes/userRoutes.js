import express from 'express';
const router = express.Router();
import { authUser, registerUser, verifyEmail } from '../controllers/userController.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
router.post('/verify', verifyEmail);

export default router;
