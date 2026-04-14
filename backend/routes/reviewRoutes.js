import express from 'express';
import {
    addReview,
    getMovieReviews,
    deleteReview,
    updateReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/', protect, addReview);         // 🔒 private
router.get('/:imdbID', getMovieReviews);    // public
router.delete('/:id', protect, deleteReview);      // 🔒 private
router.put('/:id', protect, updateReview);      // 🔒 private

export default router;