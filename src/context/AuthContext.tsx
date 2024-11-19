import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, AuthState } from '../types';

// Define the shape of our auth context
interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

// Create context with null as initial value
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider component that manages authentication state
 * Provides login/logout functionality and user information to child components
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize auth state
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Login handler - updates auth state with user info
  const login = useCallback((user: User) => {
    setAuth({ user, isAuthenticated: true });
  }, []);

  // Logout handler - clears auth state
  const logout = useCallback(() => {
    setAuth({ user: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access auth context
 * Throws error if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};