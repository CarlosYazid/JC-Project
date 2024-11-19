/**
 * Collection of application-wide constants
 */

// Valid continents for blog posts
export const CONTINENTS = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America'
] as const;

// Rating scale configuration
export const RATING_SCALE = {
  MIN: 1,
  MAX: 10,
  DEFAULT: 5
};

// Default pagination settings
export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  DEFAULT_PAGE: 1
};

// Social filter options
export const SOCIAL_FILTERS = {
  ALL: 'all',
  FOLLOWING: 'following',
  FOLLOWERS: 'followers'
} as const;

// Navigation routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  BLOG: '/blog',
  USER_PROFILE: '/user/:username'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'travel-tales-theme',
  AUTH: 'travel-tales-auth'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  USERS: '/user',
  USER: (id: string) => `/user/${id}`,
  USER_POSTS: (userId: string) => `/user/${userId}/blogPost`,
  USER_POST: (userId: string, postId: string) => `/user/${userId}/blogPost/${postId}`
} as const;

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

// Form validation rules
export const VALIDATION = {
  USERNAME: {
    PATTERN: /^[a-zA-Z0-9_]+$/,
    MIN_LENGTH: 3,
    MAX_LENGTH: 20
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50
  },
  POST: {
    TITLE_MAX_LENGTH: 100,
    REVIEW_MAX_LENGTH: 1000
  }
} as const;

// Default images
export const DEFAULT_IMAGES = {
  PROFILE: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
  POST: (location: string) => `https://source.unsplash.com/random/800x600/?${location.replace(/\s+/g, '')}`
} as const;