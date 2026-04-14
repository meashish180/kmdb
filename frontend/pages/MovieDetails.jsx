import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

function MovieDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [favMsg, setFavMsg] = useState('');
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewMsg, setReviewMsg] = useState('');

    // Fetch movie details
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                console.log('Fetching movie with id:', id);
                const { data } = await API.get(`/movies/${id}`);
                setMovie(data);
            } catch (err) {
                console.log('Error fetching movie details:', err.response || err.message || err);
                setError('Movie not found');
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await API.get(`/reviews/${id}`);
                setReviews(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchReviews();
    }, [id]);

    const handleFavorite = async () => {
        if (!user) return setFavMsg('Please login to save favorites');
        try {
            await API.post('/movies/favorite', {
                imdbID: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster,
                year: movie.Year,
            });
            setFavMsg('✅ Added to favorites!');
        } catch (err) {
            setFavMsg(err.response?.data?.message || 'Error adding favorite');
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        if (!user) return setReviewMsg('Please login to review');
        try {
            const { data } = await API.post('/reviews', {
                imdbID: id,
                rating,
                comment,
            });
            setReviews([data, ...reviews]);
            setComment('');
            setReviewMsg('✅ Review submitted!');
        } catch (err) {
            setReviewMsg(err.response?.data?.message || 'Error submitting review');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-msg">{error}</div>;
    if (!movie) return null;

    return (
        <div className="movie-details-container">

            {/* Movie Info */}
            <div className="movie-details-hero">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                    alt={movie.Title}
                    className="movie-details-poster"
                />
                <div className="movie-details-info">
                    <h1>{movie.Title}</h1>
                    <div className="movie-meta">
                        <span>📅 {movie.Year}</span>
                        <span>⏱ {movie.Runtime}</span>
                        <span>🌍 {movie.Language}</span>
                        <span>⭐ {movie.imdbRating}</span>
                    </div>
                    <p className="movie-genre">{movie.Genre}</p>
                    <p className="movie-plot">{movie.Plot}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Cast:</strong> {movie.Actors}</p>

                    <button onClick={handleFavorite} className="btn-primary">
                        ❤️ Add to Favorites
                    </button>
                    {favMsg && <p className="success-msg">{favMsg}</p>}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h2>⭐ Reviews</h2>

                {/* Submit Review */}
                {user ? (
                    <form onSubmit={handleReview} className="review-form">
                        <div className="form-group">
                            <label>Rating (1-10)</label>
                            <input
                                type="number"
                                min="1" max="10"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Your Review</label>
                            <textarea
                                rows="3"
                                placeholder="Write your review..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Submit Review
                        </button>
                        {reviewMsg && <p className="success-msg">{reviewMsg}</p>}
                    </form>
                ) : (
                    <p>Please <a href="/login">login</a> to write a review</p>
                )}

                {/* Reviews List */}
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="review-card">
                            <div className="review-header">
                                <strong>{review.username}</strong>
                                <span>⭐ {review.rating}/10</span>
                            </div>
                            <p>{review.comment}</p>
                            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first! 🎬</p>
                )}
            </div>
        </div>
    );
}

export default MovieDetails;