import React from 'react';
import { SlidersHorizontal, User, Globe, Search, Users, Bookmark } from 'lucide-react';
import { Continent } from '../types';

const CONTINENTS: Continent[] = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America'
];

interface FilterBarProps {
  rating: number;
  setRating: (rating: number) => void;
  showUserPosts: boolean;
  setShowUserPosts: (show: boolean) => void;
  userId?: number;
  selectedContinent: string;
  setSelectedContinent: (continent: string) => void;
  userFilter: string;
  setUserFilter: (username: string) => void;
  socialFilter: string;
  setSocialFilter: (filter: string) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  isAuthenticated: boolean;
}

const FilterBar = ({
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
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="flex items-center space-x-2">
        <SlidersHorizontal className="w-5 h-5 text-gray-500" />
        <label className="text-sm font-medium">Minimum Rating:</label>
        <select
          className="input py-1 pl-2 pr-8 dark:bg-gray-800 dark:border-gray-700"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[0,1,2,3,4,5,6,7,8,9,10].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Globe className="w-5 h-5 text-gray-500" />
        <label className="text-sm font-medium">Continent:</label>
        <select
          className="input py-1 pl-2 pr-8 dark:bg-gray-800 dark:border-gray-700"
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value)}
        >
          <option value="">All Continents</option>
          {CONTINENTS.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>

      {isAuthenticated && (
        <>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-500" />
            <label className="text-sm font-medium">Show Posts From:</label>
            <select
              className="input py-1 pl-2 pr-8 dark:bg-gray-800 dark:border-gray-700"
              value={socialFilter}
              onChange={(e) => setSocialFilter(e.target.value)}
            >
              <option value="all">Everyone</option>
              <option value="following">Following</option>
              <option value="followers">Followers</option>
            </select>
          </div>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center space-x-2 btn ${
              showFavorites ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{showFavorites ? 'Show All' : 'Show Favorites'}</span>
          </button>
        </>
      )}

      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-gray-500" />
        <label className="text-sm font-medium">User:</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Filter by username..."
            className="input py-1 pl-9 pr-4 dark:bg-gray-800 dark:border-gray-700"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          />
        </div>
      </div>

      {userId && (
        <button
          onClick={() => setShowUserPosts(!showUserPosts)}
          className={`flex items-center space-x-2 btn ${
            showUserPosts ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{showUserPosts ? 'Show All' : 'Show My Posts'}</span>
        </button>
      )}
    </div>
  );
};

export default FilterBar;