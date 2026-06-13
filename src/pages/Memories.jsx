import { useState, useEffect, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { useToast } from '../contexts/ToastContext';
import Spinner from '../components/common/Spinner';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import MemoryForm from '../components/memories/MemoryForm';
import MemoryCard from '../components/memories/MemoryCard';

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('latest');
  const [showModal, setShowModal] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [viewMemory, setViewMemory] = useState(null);
  const { addToast } = useToast();

  const fetchMemories = useCallback(async () => {
    setLoading(true);
    try {
      const params = { search, sortBy, ...filters };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const res = await memoryAPI.getAll(params);
      setMemories(res.data.data);
    } catch {
      addToast('Failed to load memories', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, filters, sortBy, addToast]);

  useEffect(() => {
    const debounce = setTimeout(fetchMemories, 300);
    return () => clearTimeout(debounce);
  }, [fetchMemories]);

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await memoryAPI.create(formData);
      addToast('Memory created!');
      setShowModal(false);
      fetchMemories();
    } catch {
      addToast('Failed to create memory', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setFormLoading(true);
    try {
      await memoryAPI.update(editingMemory._id, formData);
      addToast('Memory updated!');
      setEditingMemory(null);
      fetchMemories();
    } catch {
      addToast('Failed to update memory', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (memory) => {
    if (!confirm('Delete this memory?')) return;
    try {
      await memoryAPI.delete(memory._id);
      addToast('Memory deleted');
      fetchMemories();
    } catch {
      addToast('Failed to delete', 'error');
    }
  };

  const handleToggleFavorite = async (memory) => {
    try {
      await memoryAPI.toggleFavorite(memory._id);
      fetchMemories();
    } catch {
      addToast('Failed to update favorite', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Memories</h1>
          <p className="text-gray-500 text-sm mt-1">{memories.length} memories found</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium">
          <FiPlus className="w-4 h-4" /> New Memory
        </button>
      </div>

      <SearchBar search={search} onSearchChange={setSearch} filters={filters} onFilterChange={setFilters} sortBy={sortBy} onSortChange={setSortBy} />

      {loading ? (
        <Spinner size="lg" className="py-20" />
      ) : memories.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No memories found</p>
          <p className="text-sm mt-2">Create your first memory to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {memories.map((m) => (
            <MemoryCard
              key={m._id}
              memory={m}
              onEdit={setEditingMemory}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              onClick={setViewMemory}
            />
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Memory" size="lg">
        <MemoryForm onSubmit={handleCreate} onCancel={() => setShowModal(false)} loading={formLoading} />
      </Modal>

      <Modal isOpen={!!editingMemory} onClose={() => setEditingMemory(null)} title="Edit Memory" size="lg">
        {editingMemory && <MemoryForm memory={editingMemory} onSubmit={handleUpdate} onCancel={() => setEditingMemory(null)} loading={formLoading} />}
      </Modal>

      <Modal isOpen={!!viewMemory} onClose={() => setViewMemory(null)} title={viewMemory?.title || 'Memory Details'} size="lg">
        {viewMemory && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">{viewMemory.description}</p>
            {viewMemory.attachments?.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {viewMemory.attachments.map((att, i) => (
                  att.mimetype?.startsWith('image/') ? (
                    <img key={i} src={att.path} alt={att.originalName} className="rounded-lg max-h-48 object-cover" />
                  ) : (
                    <a key={i} href={att.path} target="_blank" rel="noreferrer" className="text-primary-600 text-sm underline">{att.originalName}</a>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Memories;
