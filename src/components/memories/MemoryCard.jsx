import { CATEGORY_COLORS, MOOD_EMOJI, formatDate } from '../../utils/constants';
import { FiStar, FiArchive, FiEdit2, FiTrash2, FiHeart } from 'react-icons/fi';

const MemoryCard = ({ memory, onEdit, onDelete, onToggleFavorite, onToggleArchive, onClick }) => {
  const categoryClass = CATEGORY_COLORS[memory.category] || 'bg-gray-100 text-gray-700';

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={() => onClick?.(memory)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryClass}`}>
              {memory.category}
            </span>
            {memory.mood && memory.mood !== 'Neutral' && (
              <span className="text-sm">{MOOD_EMOJI[memory.mood]}</span>
            )}
            {memory.isFavorite && <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />}
            {memory.isArchived && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <FiArchive className="w-3 h-3" /> Archived
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg truncate">{memory.title}</h3>
          {memory.description && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{memory.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onToggleFavorite?.(memory)} className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-500">
            <FiHeart className={`w-4 h-4 ${memory.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button onClick={() => onEdit?.(memory)} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500">
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete?.(memory)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{formatDate(memory.date)}</span>
        {memory.tags?.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-end">
            {memory.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;
