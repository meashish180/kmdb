import { useState } from 'react';
import API from '../api/axios';
import MovieCard from '../components/MovieCard';

function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const { data } = await API.get(`/movies/search?q=${query}`);
      setMovies(data.movies);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Explore your next favorite film</h1>
        <p>Search the OMDB catalogue for movies, browse details, and save the best ones to your favorites.</p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a movie title, actor, or year"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search Movies'}
          </button>
        </form>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {movies.length > 0 ? (
        <section className="movies-section">
          <h2>Search Results ({movies.length})</h2>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </section>
      ) : (
        !loading && (
          <div className="empty-state">
            <p>Start typing a movie name and click search to explore.</p>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
