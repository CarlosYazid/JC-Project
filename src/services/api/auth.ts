import { apiClient, handleApiRequest } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { User } from '@/types';

/**
 * Authentication related API services
 */
export const authAPI = {
  /**
   * Authenticate user with email/password
   */
  login: async (email: string, password: string) => {
    try {
      const response = await handleApiRequest<User[]>(
        apiClient.get(API_ENDPOINTS.USERS, { params: { email } })
      );
      const user = response.data[0];
      
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   */
  register: async (userData: Partial<User>) => {
    try {
      return await handleApiRequest<User>(
        apiClient.post(API_ENDPOINTS.USERS, {
          ...userData,
          favorites: [],
          followers: [],
          following: []
        })
      );
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Update existing user
   */
  updateUser: async (userId: string, userData: Partial<User>) => {
    try {
      // Ensure favorites array exists
      const updatedData = {
        ...userData,
        favorites: userData.favorites || []
      };

      const response = await handleApiRequest<User>(
        apiClient.put(API_ENDPOINTS.USER(userId), updatedData)
      );

      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  /**
   * Toggle post favorite status for user
   */
  toggleFavorite: async (userId: string, postId: string, currentUser: User) => {
    try {
      const favorites = currentUser.favorites || [];
      const updatedFavorites = favorites.includes(postId)
        ? favorites.filter(id => id !== postId)
        : [...favorites, postId];

      const response = await handleApiRequest<User>(
        apiClient.put(API_ENDPOINTS.USER(userId), {
          ...currentUser,
          favorites: updatedFavorites
        })
      );

      return response.data;
    } catch (error) {
      console.error('Toggle favorite error:', error);
      throw error;
    }
  },

  /**
   * Delete user account
   */
  deleteUser: async (userId: string) => {
    try {
      await handleApiRequest<void>(
        apiClient.delete(API_ENDPOINTS.USER(userId))
      );
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },
};