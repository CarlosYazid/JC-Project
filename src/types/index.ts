// Type definitions for the application's core data structures

// User interface representing a registered user
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string; // Encrypted password
  createdAt: string;
  favorites: string[]; // Array of favorite post IDs
  followers: string[]; // Array of usernames who follow this user
  following: string[]; // Array of usernames this user follows
  bio?: string; // Optional user biography
  profileImage?: string; // Optional profile image URL
}

// BlogPost interface representing a travel post
export interface BlogPost {
  id: string;
  name?: string; // Optional post title
  location: string; // Travel destination
  review: string; // User's review/description
  rating: number; // Rating from 1-10
  imageUrl?: string; // Optional destination image
  creator: string; // Full name of post creator
  username: string; // Creator's username
  userId: number; // Creator's user ID
  continent: string; // Destination continent
  createdAt: string; // Post creation timestamp
}

// Authentication state interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Valid continent options for blog posts
export type Continent =
  | 'Africa'
  | 'Antarctica'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';
