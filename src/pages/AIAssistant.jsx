import { useState } from 'react';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { useToast } from '../contexts/ToastContext';
import { CATEGORY_COLORS } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const suggestions = [
  'Show all Goa memories',
  'What books did I read in 2025?',
  'Show my future plans',
  'What movies did I watch?',
  'Show my gift ideas',
];

const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { addToast } = useToast();

  const handleSearch = async (q) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setQuery(searchQuery);
    try {
      const res = await memoryAPI.aiSearch(searchQuery);
      setResponse(res.data.data);
    } catch {
      addToast('Search failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl mb-4">
          <FiMessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold">AI Memory Assistant</h1>
        <p className="text-gray-500 text-sm mt-1">Ask questions about your stored memories</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSearch(s)}
            className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask about your memories..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors disabled:opacity-50"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>

      {loading && <Spinner size="md" className="py-8" />}

      {response && !loading && (
        <div className="space-y-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-5 border border-primary-200 dark:border-primary-800">
            <p className="whitespace-pre-line text-sm">{response.response}</p>
          </div>
          {response.results?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {response.results.map((memory) => (
                <div key={memory._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[memory.category]}`}>{memory.category}</span>
                  <h3 className="font-medium mt-2">{memory.title}</h3>
                  {memory.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{memory.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
