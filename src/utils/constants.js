export const CATEGORIES = [
  'Password Hint',
  'Conversation',
  'Gift Idea',
  'Place Visited',
  'Movie Watched',
  'Book Read',
  'Future Plan',
  'Personal Note',
  'Memory',
  'Wishlist',
];

export const MOODS = ['Happy', 'Sad', 'Excited', 'Motivated', 'Neutral'];

export const CATEGORY_COLORS = {
  'Password Hint': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Conversation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Gift Idea': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  'Place Visited': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'Movie Watched': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  'Book Read': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'Future Plan': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  'Personal Note': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  Memory: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  Wishlist: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
};

export const MOOD_EMOJI = {
  Happy: '😊',
  Sad: '😢',
  Excited: '🤩',
  Motivated: '💪',
  Neutral: '😐',
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const daysRemaining = (targetDate) => {
  if (!targetDate) return null;
  return Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
};
