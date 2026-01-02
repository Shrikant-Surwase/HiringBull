export const COMPANIES = [
  { id: 'google', name: 'Google', emoji: '🔍', type: 'mnc' },
  { id: 'apple', name: 'Apple', emoji: '🍎', type: 'mnc' },
  { id: 'meta', name: 'Meta', emoji: '👤', type: 'mnc' },
  { id: 'amazon', name: 'Amazon', emoji: '📦', type: 'mnc' },
  { id: 'microsoft', name: 'Microsoft', emoji: '💻', type: 'mnc' },
  { id: 'netflix', name: 'Netflix', emoji: '🎬', type: 'mnc' },
  { id: 'spotify', name: 'Spotify', emoji: '🎵', type: 'global-startup' },
  { id: 'stripe', name: 'Stripe', emoji: '💳', type: 'global-startup' },
  { id: 'airbnb', name: 'Airbnb', emoji: '🏠', type: 'global-startup' },
  { id: 'uber', name: 'Uber', emoji: '🚗', type: 'global-startup' },
  { id: 'zomato', name: 'Zomato', emoji: '🍕', type: 'indian-startup' },
  { id: 'swiggy', name: 'Swiggy', emoji: '🍱', type: 'indian-startup' },
  { id: 'flipkart', name: 'Flipkart', emoji: '🛍️', type: 'indian-startup' },
  { id: 'razorpay', name: 'Razorpay', emoji: '💸', type: 'indian-startup' },
];

export const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Global MNC', value: 'mnc' },
  { label: 'Global Startups', value: 'global-startup' },
  { label: 'YCombinator', value: 'ycombinator' },
  { label: 'Indian Startups', value: 'indian-startup' },
] as const;
