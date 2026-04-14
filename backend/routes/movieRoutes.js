import express from 'express';
import { searchMovies, getMovieById } from '../controllers/movieController.js';

const router = express.Router();

router.get('/search', searchMovies);
router.get('/:imdbID', getMovieById);

export default router;
