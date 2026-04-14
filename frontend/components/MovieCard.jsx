import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
        alt={movie.Title}
        className="movie-card-poster"
      />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>📅 {movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;