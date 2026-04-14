import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchFavorites = async () => {
      try {
        const { data } = await API.get('/movies/favorites');
        setFavorites(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleRemove = async (imdbID) => {
    try {
      await API.delete(`/movies/favorite/${imdbID}`);
      setFavorites(favorites.filter((f) => f.imdbID !== imdbID));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-container">
      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet! Search for movies and add them ❤️</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="favorite-card">
              <MovieCard movie={{
                imdbID: movie.imdbID,
                Title: movie.title,
                Poster: movie.poster,
                Year: movie.year,
              }} />
              <button
                onClick={() => handleRemove(movie.imdbID)}
                className="btn-danger"
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;