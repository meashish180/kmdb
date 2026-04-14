import Review from '../models/Review.js';

// ─────────────────────────────────────────
// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
// ─────────────────────────────────────────
export const addReview = async (req, res) => {
  try {
    const { imdbID, rating, comment } = req.body;

    // Check if user already reviewed this movie
    const alreadyReviewed = await Review.findOne({
      imdbID,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this movie' });
    }

    const review = await Review.create({
      imdbID,
      user: req.user._id,
      username: req.user.name,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Already reviewed' });
    }

    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// @desc    Get all reviews for a movie
// @route   GET /api/reviews/:imdbID
// @access  Public
// ─────────────────────────────────────────
export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ imdbID: req.params.imdbID })
      .sort({ createdAt: -1 }); // newest first

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
// ─────────────────────────────────────────
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Make sure the review belongs to the logged in user
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted ✅' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
// ─────────────────────────────────────────
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};