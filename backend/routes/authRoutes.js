import express from 'express'
import authController from '../controllers/authController.js';
import authmiddleware from '../middleware/authmiddleware.js';
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = authController;

const {protect } = authmiddleware
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // 🔒 protected

export default router;