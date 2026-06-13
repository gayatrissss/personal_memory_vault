import { useState, useEffect } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { memoryAPI } from '../services/memoryService';
import { formatDate } from '../utils/constants';
import Spinner from '../components/common/Spinner';

const statusColors = {
  Pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

const priorityColors = {
  Low: 'border-l-gray-400',
  Medium: 'border-l-yellow-400',
  High: 'border-l-red-500',
};

const FuturePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memoryAPI.getPlans().then((res) => setPlans(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Future Plans</h1>
        <p className="text-gray-500 text-sm mt-1">{plans.length} goals tracked</p>
      </div>
      {plans.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No future plans yet.</p>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan._id} className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 border-l-4 ${priorityColors[plan.priority] || 'border-l-gray-400'} hover:shadow-lg transition-shadow`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[plan.status]}`}>{plan.status}</span>
                    <span className="text-xs text-gray-400">{plan.priority} Priority</span>
                  </div>
                  <h3 className="font-semibold text-lg">{plan.title}</h3>
                  {plan.description && <p className="text-gray-500 text-sm mt-1">{plan.description}</p>}
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-2"><FiCalendar className="w-3 h-3" /> Target: {formatDate(plan.targetDate)}</p>
                </div>
                {plan.daysRemaining !== null && plan.daysRemaining !== undefined && (
                  <div className={`text-center px-4 py-3 rounded-xl ${plan.daysRemaining <= 7 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-cyan-50 dark:bg-cyan-900/20'}`}>
                    <FiClock className={`w-5 h-5 mx-auto mb-1 ${plan.daysRemaining <= 7 ? 'text-red-500' : 'text-cyan-500'}`} />
                    <p className="text-2xl font-bold">{plan.daysRemaining > 0 ? plan.daysRemaining : plan.daysRemaining === 0 ? '0' : Math.abs(plan.daysRemaining)}</p>
                    <p className="text-xs text-gray-500">{plan.daysRemaining > 0 ? 'days left' : plan.daysRemaining === 0 ? 'today!' : 'days overdue'}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FuturePlans;
