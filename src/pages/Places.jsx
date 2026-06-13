import { useState, useEffect } from 'react';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { formatDate } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [view, setView] = useState('cards');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getPlaces().then((res) => setPlaces(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  const timeline = places.reduce((acc, p) => {
    const year = new Date(p.dateVisited || p.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Places Visited</h1>
          <p className="text-gray-500 text-sm mt-1">{places.length} places explored</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('cards')} className={`px-4 py-2 rounded-lg text-sm ${view === 'cards' ? 'bg-primary-600 text-white' : 'border border-gray-300 dark:border-gray-700'}`}>Cards</button>
          <button onClick={() => setView('timeline')} className={`px-4 py-2 rounded-lg text-sm ${view === 'timeline' ? 'bg-primary-600 text-white' : 'border border-gray-300 dark:border-gray-700'}`}>Timeline</button>
        </div>
      </div>

      {places.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No places recorded yet.</p>
      ) : view === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div key={place._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                <FiMapPin className="w-12 h-12 text-white/80" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{place.placeName || place.title}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1"><FiMapPin className="w-3 h-3" /> {place.location}</p>
                <p className="text-gray-400 text-xs flex items-center gap-1 mt-2"><FiCalendar className="w-3 h-3" /> {formatDate(place.dateVisited || place.date)}</p>
                {place.description && <p className="text-sm text-gray-500 mt-3 line-clamp-2">{place.description}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(timeline).sort((a, b) => b - a).map((year) => (
            <div key={year}>
              <h2 className="text-xl font-bold text-green-600 mb-4">{year}</h2>
              <div className="space-y-3 ml-4 border-l-2 border-green-300 pl-6">
                {timeline[year].map((p) => (
                  <div key={p._id} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium">{p.placeName || p.title}</h3>
                    <p className="text-sm text-gray-500">{p.location} · {formatDate(p.dateVisited || p.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
