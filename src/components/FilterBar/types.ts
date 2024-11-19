export interface FilterBarProps {
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