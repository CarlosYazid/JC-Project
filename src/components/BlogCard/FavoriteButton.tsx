import React from 'react';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  postId: string;
}

/**
 * Button component for toggling post favorites
 */
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ postId }) => {
  const { toggleFavorite, isFavorite, isUpdating } = useFavorites();

  const handleClick = async () => {
    try {
      await toggleFavorite(postId);
    } catch (error) {
      // Error is already logged in the hook
      alert('Failed to update favorites. Please try again.');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isUpdating}
      className={`btn btn-secondary text-sm px-3 py-1 ${
        isUpdating ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isFavorite(postId) ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
    </button>
  );
};