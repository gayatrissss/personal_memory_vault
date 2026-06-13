import { useState, useEffect } from 'react';
import { memoryAPI } from '../services/memoryService';
import Spinner from '../components/common/Spinner';
import MemoryCard from '../components/memories/MemoryCard';

const Favorites = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getFavorites()
      .then((res) => setMemories(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Favorite Memories</h1>
        <p className="text-gray-500 text-sm mt-1">{memories.length} favorites</p>
      </div>
      {memories.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No favorite memories yet. Star a memory to add it here!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {memories.map((m) => <MemoryCard key={m._id} memory={m} />)}
        </div>
      )}
    </div>
  );
};

export default Favorites;
