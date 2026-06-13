import { useState } from 'react';
import { CATEGORIES, MOODS } from '../../utils/constants';
import { FiUpload, FiX } from 'react-icons/fi';

const MemoryForm = ({ memory, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    title: memory?.title || '',
    description: memory?.description || '',
    category: memory?.category || 'Memory',
    tags: memory?.tags?.join(', ') || '',
    date: memory?.date ? new Date(memory.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    mood: memory?.mood || 'Neutral',
    placeName: memory?.placeName || '',
    location: memory?.location || '',
    dateVisited: memory?.dateVisited ? new Date(memory.dateVisited).toISOString().split('T')[0] : '',
    genre: memory?.genre || '',
    rating: memory?.rating || '',
    watchDate: memory?.watchDate ? new Date(memory.watchDate).toISOString().split('T')[0] : '',
    author: memory?.author || '',
    completionDate: memory?.completionDate ? new Date(memory.completionDate).toISOString().split('T')[0] : '',
    targetDate: memory?.targetDate ? new Date(memory.targetDate).toISOString().split('T')[0] : '',
    priority: memory?.priority || 'Medium',
    status: memory?.status || 'Pending',
    personName: memory?.personName || '',
    giftIdea: memory?.giftIdea || '',
    occasion: memory?.occasion || '',
    budget: memory?.budget || '',
    reminderDate: memory?.reminderDate ? new Date(memory.reminderDate).toISOString().split('T')[0] : '',
    notes: memory?.notes || '',
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== '' && value !== null) formData.append(key, value);
    });
    files.forEach((file) => formData.append('attachments', file));
    onSubmit(formData);
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm';
  const labelClass = 'block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category *</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Mood</label>
          <select name="mood" value={form.mood} onChange={handleChange} className={inputClass}>
            {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="travel, family, work" className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
        </div>
      </div>

      {form.category === 'Place Visited' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl">
          <div><label className={labelClass}>Place Name</label><input name="placeName" value={form.placeName} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Location</label><input name="location" value={form.location} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Date Visited</label><input type="date" name="dateVisited" value={form.dateVisited} onChange={handleChange} className={inputClass} /></div>
        </div>
      )}

      {form.category === 'Movie Watched' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl">
          <div><label className={labelClass}>Genre</label><input name="genre" value={form.genre} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Rating (0-10)</label><input type="number" min="0" max="10" step="0.5" name="rating" value={form.rating} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Watch Date</label><input type="date" name="watchDate" value={form.watchDate} onChange={handleChange} className={inputClass} /></div>
        </div>
      )}

      {form.category === 'Book Read' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
          <div><label className={labelClass}>Author</label><input name="author" value={form.author} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Rating (0-10)</label><input type="number" min="0" max="10" step="0.5" name="rating" value={form.rating} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Completion Date</label><input type="date" name="completionDate" value={form.completionDate} onChange={handleChange} className={inputClass} /></div>
        </div>
      )}

      {form.category === 'Future Plan' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-xl">
          <div><label className={labelClass}>Target Date</label><input type="date" name="targetDate" value={form.targetDate} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
              <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
            </select>
          </div>
          <div><label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      )}

      {form.category === 'Gift Idea' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-pink-50 dark:bg-pink-900/10 rounded-xl">
          <div><label className={labelClass}>Person Name</label><input name="personName" value={form.personName} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Gift Idea</label><input name="giftIdea" value={form.giftIdea} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Occasion</label><input name="occasion" value={form.occasion} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Budget</label><input name="budget" value={form.budget} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Reminder Date</label><input type="date" name="reminderDate" value={form.reminderDate} onChange={handleChange} className={inputClass} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Notes</label><textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className={inputClass} /></div>
        </div>
      )}

      <div>
        <label className={labelClass}>Attachments</label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center">
          <input type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt" onChange={(e) => setFiles([...e.target.files])} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
            <FiUpload className="w-8 h-8" />
            <span className="text-sm">Click to upload images or documents</span>
          </label>
          {files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {files.map((f, i) => (
                <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
                  {f.name}
                  <FiX className="w-3 h-3 cursor-pointer" onClick={() => setFiles(files.filter((_, j) => j !== i))} />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors text-sm disabled:opacity-50">
          {loading ? 'Saving...' : memory ? 'Update Memory' : 'Create Memory'}
        </button>
      </div>
    </form>
  );
};

export default MemoryForm;
