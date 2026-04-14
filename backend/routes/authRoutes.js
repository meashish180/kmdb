import express from 'express'
import authController from '../controllers/authController.js';
import { protect } from '../middleware/authmiddleware.js';
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = authController;

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // 🔒 protected

export default router;