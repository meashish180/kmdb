export const searchMovies = async (req, res) => {
    const { q } = req.query;
    const OMDB_API_KEY = process.env.OMDB_API_KEY;

    if (!q) {
        return res.status(400).json({ message: 'Query parameter q is required' });
    }

    if (!OMDB_API_KEY) {
        return res.status(500).json({ message: 'OMDB_API_KEY is not configured' });
    }

    try {
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(q)}&type=movie`
        );
        const data = await response.json();

        if (data.Response === 'False') {
            return res.status(404).json({ message: data.Error || 'No movies found' });
        }

        return res.json({ movies: data.Search || [] });
    } catch (error) {
        console.error('OMDB fetch error:', error);
        return res.status(500).json({ message: 'Unable to fetch movies from OMDB' });
    }
};

export const getMovieById = async (req, res) => {
    const { imdbID } = req.params;
    const OMDB_API_KEY = process.env.OMDB_API_KEY;

    console.log('Looking for imdbID:', imdbID);

    if (!OMDB_API_KEY) {
        return res.status(500).json({ message: 'OMDB_API_KEY is not configured' });
    }

    try {
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
        );
        const data = await response.json();

        console.log('OMDB Response:', data.Response);

        if (data.Response === 'False') {
            return res.status(404).json({ message: data.Error || 'Movie not found' });
        }

        return res.json(data);
    } catch (error) {
        console.error('OMDB fetch error:', error);
        return res.status(500).json({ message: error.message || 'Unable to fetch movie details' });
    }
};
