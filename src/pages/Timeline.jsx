import { useState, useEffect } from 'react';
import { memoryAPI } from '../services/memoryService';
import { CATEGORY_COLORS, MOOD_EMOJI, formatDate } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const Timeline = () => {
  const [timeline, setTimeline] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getTimeline()
      .then((res) => setTimeline(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  const years = Object.keys(timeline).sort((a, b) => b - a);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">Memory Timeline</h1>
        <p className="text-gray-500 mt-2">Your life journey in chronological order</p>
      </div>

      {years.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No memories to display yet.</p>
      ) : (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-indigo-500 to-purple-500" />
          {years.map((year) => (
            <div key={year} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
                  {year}
                </div>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="ml-8 space-y-4 pl-8">
                {timeline[year].map((memory) => (
                  <div key={memory._id} className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
                    <div className="absolute -left-[41px] top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-950" />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[memory.category]}`}>{memory.category}</span>
                          {memory.mood && memory.mood !== 'Neutral' && <span>{MOOD_EMOJI[memory.mood]}</span>}
                        </div>
                        <h3 className="font-semibold text-lg">{memory.title}</h3>
                        {memory.description && <p className="text-gray-500 text-sm mt-1">{memory.description}</p>}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(memory.date)}</span>
                    </div>
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

export default Timeline;
