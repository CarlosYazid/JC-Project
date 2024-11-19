import { VALIDATION } from '@/constants';

/**
 * Validation utility functions
 */

/**
 * Validates username format
 */
export const validateUsername = (username: string): boolean => {
  return VALIDATION.USERNAME.PATTERN.test(username) &&
    username.length >= VALIDATION.USERNAME.MIN_LENGTH &&
    username.length <= VALIDATION.USERNAME.MAX_LENGTH;
};

/**
 * Validates password requirements
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION.PASSWORD.MIN_LENGTH &&
    password.length <= VALIDATION.PASSWORD.MAX_LENGTH;
};

/**
 * Validates post content
 */
export const validatePost = (title: string, review: string): boolean => {
  return title.length <= VALIDATION.POST.TITLE_MAX_LENGTH &&
    review.length <= VALIDATION.POST.REVIEW_MAX_LENGTH;
};

/**
 * Validates rating is within bounds
 */
export const validateRating = (rating: number): number => {
  return Math.min(Math.max(rating, RATING_SCALE.MIN), RATING_SCALE.MAX);
};