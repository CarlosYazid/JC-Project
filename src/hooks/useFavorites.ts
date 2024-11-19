import { useState } from 'react';
import { authAPI } from '@/services/api/auth';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/types';

/**
 * Custom hook for managing post favorites
 */
export const useFavorites = () => {
  const { user, login } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleFavorite = async (postId: string) => {
    if (!user?.id) return;
    
    setIsUpdating(true);
    try {
      const updatedUser = await authAPI.toggleFavorite(
        user.id.toString(),
        postId,
        user
      );
      login(updatedUser);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const isFavorite = (postId: string): boolean => {
    return user?.favorites?.includes(postId) || false;
  };

  return {
    toggleFavorite,
    isFavorite,
    isUpdating
  };
};