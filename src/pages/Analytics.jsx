import { useState, useEffect } from 'react';
import { memoryAPI } from '../services/memoryService';
import { CATEGORY_COLORS, MOOD_EMOJI } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getAnalytics().then((res) => setData(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;
  if (!data) return null;

  const maxCategoryCount = Math.max(...(data.categoryStats?.map((c) => c.count) || [1]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Memory Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Insights into your memory patterns</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
          <p className="text-4xl font-bold text-primary-600">{data.totalMemories}</p>
          <p className="text-sm text-gray-500 mt-1">Total Memories</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
          <p className="text-4xl font-bold text-green-600">{data.categoryStats?.length || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Categories Used</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
          <p className="text-lg font-bold text-amber-600">{data.mostUsedCategory?._id || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-1">Most Used Category</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="font-semibold mb-6">Category Breakdown</h2>
        <div className="space-y-3">
          {data.categoryStats?.map((cat) => (
            <div key={cat._id}>
              <div className="flex justify-between text-sm mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs ${CATEGORY_COLORS[cat._id]}`}>{cat._id}</span>
                <span className="font-medium">{cat.count}</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all"
                  style={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold mb-4">Monthly Activity</h2>
          {data.monthlyActivity?.length ? (
            <div className="flex items-end gap-2 h-40">
              {[...data.monthlyActivity].reverse().map((m, i) => {
                const maxCount = Math.max(...data.monthlyActivity.map((x) => x.count));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-medium">{m.count}</span>
                    <div
                      className="w-full bg-primary-500 rounded-t-lg transition-all"
                      style={{ height: `${(m.count / maxCount) * 100}%`, minHeight: '4px' }}
                    />
                    <span className="text-xs text-gray-400">{m._id.month}/{m._id.year}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No activity data yet.</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold mb-4">Mood Distribution</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.moodStats?.map((m) => (
              <div key={m._id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-2xl">{MOOD_EMOJI[m._id] || '😐'}</span>
                <div>
                  <p className="font-medium text-sm">{m._id}</p>
                  <p className="text-xs text-gray-500">{m.count} memories</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
