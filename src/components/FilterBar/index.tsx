import React from 'react';
import { SlidersHorizontal, User, Globe, Search, Users, Bookmark } from 'lucide-react';
import { CONTINENTS, SOCIAL_FILTERS, RATING_SCALE } from '@/constants';
import { RatingFilter } from './RatingFilter';
import { ContinentFilter } from './ContinentFilter';
import { SocialFilter } from './SocialFilter';
import { UserFilter } from './UserFilter';
import type { FilterBarProps } from './types';

/**
 * Filter bar component for blog posts
 */
const FilterBar: React.FC<FilterBarProps> = ({
  rating,
  setRating,
  showUserPosts,
  setShowUserPosts,
  userId,
  selectedContinent,
  setSelectedContinent,
  userFilter,
  setUserFilter,
  socialFilter,
  setSocialFilter,
  showFavorites,
  setShowFavorites,
  isAuthenticated
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <RatingFilter
        rating={rating}
        setRating={setRating}
        min={RATING_SCALE.MIN}
        max={RATING_SCALE.MAX}
      />

      <ContinentFilter
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
        continents={CONTINENTS}
      />

      {isAuthenticated && (
        <SocialFilter
          socialFilter={socialFilter}
          setSocialFilter={setSocialFilter}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />
      )}

      <UserFilter
        userFilter={userFilter}
        setUserFilter={setUserFilter}
        showUserPosts={showUserPosts}
        setShowUserPosts={setShowUserPosts}
        userId={userId}
      />
    </div>
  );
};

export default FilterBar;