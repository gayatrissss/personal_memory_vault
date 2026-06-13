import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Memories from './pages/Memories';
import Timeline from './pages/Timeline';
import Favorites from './pages/Favorites';
import Places from './pages/Places';
import Movies from './pages/Movies';
import Books from './pages/Books';
import FuturePlans from './pages/FuturePlans';
import GiftIdeas from './pages/GiftIdeas';
import Analytics from './pages/Analytics';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="memories" element={<Memories />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="places" element={<Places />} />
        <Route path="movies" element={<Movies />} />
        <Route path="books" element={<Books />} />
        <Route path="plans" element={<FuturePlans />} />
        <Route path="gifts" element={<GiftIdeas />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
