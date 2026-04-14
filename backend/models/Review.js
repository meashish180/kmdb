import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    imdbID: {
      type: String,
      required: true,   // OMDB movie ID e.g. tt3896198
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// One review per user per movie
reviewSchema.index({ imdbID: 1, user: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);