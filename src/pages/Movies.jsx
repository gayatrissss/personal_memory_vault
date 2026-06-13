import { useState, useEffect } from 'react';
import { FiFilm, FiStar } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { formatDate } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getMovies().then((res) => setMovies(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Movies Watched</h1>
        <p className="text-gray-500 text-sm mt-1">{movies.length} movies tracked</p>
      </div>
      {movies.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No movies tracked yet. Add a memory with category "Movie Watched".</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiFilm className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{movie.title}</h3>
                  {movie.genre && <p className="text-sm text-gray-500">{movie.genre}</p>}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    {movie.rating && (
                      <span className="flex items-center gap-1 text-amber-500"><FiStar className="w-3 h-3 fill-current" /> {movie.rating}/10</span>
                    )}
                    <span>{formatDate(movie.watchDate || movie.date)}</span>
                  </div>
                  {movie.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{movie.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
