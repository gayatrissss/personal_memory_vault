import { useState, useEffect } from 'react';
import { FiPlus, FiBook, FiStar, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { useToast } from '../contexts/ToastContext';
import { CATEGORY_COLORS, formatDate, daysRemaining } from '../utils/constants';
import Spinner from '../components/common/Spinner';
import Modal from '../components/common/Modal';
import MemoryForm from '../components/memories/MemoryForm';
import MemoryCard from '../components/memories/MemoryCard';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { addToast } = useToast();

  const fetchDashboard = async () => {
    try {
      const res = await memoryAPI.getDashboard();
      setData(res.data.data);
    } catch {
      addToast('Failed to load dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await memoryAPI.create(formData);
      addToast('Memory created!');
      setShowModal(false);
      fetchDashboard();
    } catch {
      addToast('Failed to create memory', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's your memory overview.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors">
          <FiPlus className="w-4 h-4" /> New Memory
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiBook} label="Total Memories" value={data.totalMemories} color="bg-primary-100 dark:bg-primary-900/30 text-primary-600" />
        <StatCard icon={FiStar} label="Favorites" value={data.favoriteMemories?.length || 0} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600" />
        <StatCard icon={FiCalendar} label="Upcoming Plans" value={data.upcomingPlans?.length || 0} color="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600" />
        <StatCard icon={FiTrendingUp} label="Categories" value={data.categoryStats?.length || 0} color="bg-green-100 dark:bg-green-900/30 text-green-600" />
      </div>

      {data.categoryStats?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold mb-4">Category Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {data.categoryStats.map((cat) => (
              <div key={cat._id} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <span className={`inline-block text-xs px-2 py-1 rounded-full mb-2 ${CATEGORY_COLORS[cat._id] || ''}`}>{cat._id}</span>
                <p className="text-xl font-bold">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-4">Recent Memories</h2>
          <div className="space-y-3">
            {data.recentMemories?.length ? data.recentMemories.map((m) => (
              <MemoryCard key={m._id} memory={m} />
            )) : <p className="text-gray-500 text-sm">No memories yet. Create your first one!</p>}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-4">Upcoming Plans</h2>
          <div className="space-y-3">
            {data.upcomingPlans?.length ? data.upcomingPlans.map((plan) => {
              const days = daysRemaining(plan.targetDate);
              return (
                <div key={plan._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{plan.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(plan.targetDate)}</p>
                    </div>
                    {days !== null && (
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${days <= 7 ? 'bg-red-100 text-red-700' : 'bg-cyan-100 text-cyan-700'}`}>
                        {days > 0 ? `${days} days left` : days === 0 ? 'Today!' : 'Overdue'}
                      </span>
                    )}
                  </div>
                </div>
              );
            }) : <p className="text-gray-500 text-sm">No upcoming plans.</p>}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Memory" size="lg">
        <MemoryForm onSubmit={handleCreate} onCancel={() => setShowModal(false)} loading={formLoading} />
      </Modal>
    </div>
  );
};

export default Dashboard;
