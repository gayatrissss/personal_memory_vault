import { useState, useEffect } from 'react';
import { FiGift, FiUser, FiDollarSign, FiBell } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { formatDate } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const GiftIdeas = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getGifts().then((res) => setGifts(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gift Ideas</h1>
        <p className="text-gray-500 text-sm mt-1">{gifts.length} gift ideas saved</p>
      </div>
      {gifts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No gift ideas yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gifts.map((gift) => (
            <div key={gift._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiGift className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{gift.giftIdea || gift.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><FiUser className="w-3 h-3" /> {gift.personName}</p>
                  {gift.occasion && <p className="text-sm text-gray-400 mt-1">Occasion: {gift.occasion}</p>}
                  {gift.budget && <p className="text-sm text-gray-400 flex items-center gap-1 mt-1"><FiDollarSign className="w-3 h-3" /> {gift.budget}</p>}
                  {gift.reminderDate && (
                    <p className="text-xs text-pink-500 flex items-center gap-1 mt-2"><FiBell className="w-3 h-3" /> Reminder: {formatDate(gift.reminderDate)}</p>
                  )}
                  {gift.notes && <p className="text-sm text-gray-500 mt-2">{gift.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftIdeas;
