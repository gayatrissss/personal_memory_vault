import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  FiHome, FiBook, FiMapPin, FiFilm, FiBookOpen, FiCalendar,
  FiGift, FiStar, FiClock, FiBarChart2, FiMessageCircle,
  FiUser, FiLogOut, FiMenu, FiX, FiSun, FiMoon, FiBell, FiArchive,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { notificationAPI } from '../../services/memoryService';

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { to: '/memories', icon: FiBook, label: 'All Memories' },
  { to: '/timeline', icon: FiClock, label: 'Timeline' },
  { to: '/favorites', icon: FiStar, label: 'Favorites' },
  { to: '/places', icon: FiMapPin, label: 'Places Visited' },
  { to: '/movies', icon: FiFilm, label: 'Movies' },
  { to: '/books', icon: FiBookOpen, label: 'Books' },
  { to: '/plans', icon: FiCalendar, label: 'Future Plans' },
  { to: '/gifts', icon: FiGift, label: 'Gift Ideas' },
  { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/ai-assistant', icon: FiMessageCircle, label: 'AI Assistant' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
];

const Sidebar = ({ isOpen, onClose }) => (
  <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
        <FiArchive className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="font-bold text-lg leading-tight">Memory Vault</h1>
        <p className="text-xs text-gray-500">Your Second Brain</p>
      </div>
    </div>
    <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [countRes, notifRes] = await Promise.all([
          notificationAPI.getUnreadCount(),
          notificationAPI.getAll(),
        ]);
        setUnreadCount(countRes.data.data.count);
        setNotifications(notifRes.data.data);
      } catch { /* ignore */ }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}><FiX className="w-4 h-4" /></button>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-gray-500 text-center">No notifications</p>
                    ) : (
                      notifications.slice(0, 10).map((n) => (
                        <div key={n._id} className={`p-3 border-b border-gray-100 dark:border-gray-800 text-sm ${!n.isRead ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}>
                          <p className="font-medium">{n.title}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-gray-200 dark:border-gray-800">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button onClick={handleLogout} className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors" title="Logout">
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
};

export default Layout;
