import api from './api';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.put('/auth/profile', data, config);
  },
};

export const memoryAPI = {
  getAll: (params) => api.get('/memories', { params }),
  getOne: (id) => api.get(`/memories/${id}`),
  create: (data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.post('/memories', data, config);
  },
  update: (id, data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.put(`/memories/${id}`, data, config);
  },
  delete: (id) => api.delete(`/memories/${id}`),
  toggleFavorite: (id) => api.patch(`/memories/${id}/favorite`),
  toggleArchive: (id) => api.patch(`/memories/${id}/archive`),
  getDashboard: () => api.get('/memories/dashboard'),
  getTimeline: () => api.get('/memories/timeline'),
  getFavorites: () => api.get('/memories/favorites'),
  getPlaces: () => api.get('/memories/places'),
  getMovies: () => api.get('/memories/movies'),
  getBooks: () => api.get('/memories/books'),
  getPlans: () => api.get('/memories/plans'),
  getGifts: () => api.get('/memories/gifts'),
  getAnalytics: () => api.get('/memories/analytics'),
  aiSearch: (query) => api.post('/memories/ai-search', { query }),
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
  create: (data) => api.post('/notifications', data),
  delete: (id) => api.delete(`/notifications/${id}`),
};
