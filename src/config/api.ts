/**
 * API configuration and setup
 */

// Get API base URL from environment variables
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
} as const;

// Error messages
export const API_ERRORS = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error occurred.',
  UNAUTHORIZED: 'Unauthorized access.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION: 'Validation error.',
  DEFAULT: 'An unexpected error occurred.'
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;