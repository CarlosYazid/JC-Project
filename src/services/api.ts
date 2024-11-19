import axios, { AxiosError } from 'axios';
import type { User, BlogPost } from '../types';

const BASE_URL = 'https://672da310fd89797156431180.mockapi.io/traveltales';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error(axiosError.response.data?.message || 'Server error occurred');
    }
    if (axiosError.request) {
      throw new Error('No response from server. Please check your connection.');
    }
  }
  throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
};

const normalizeRating = (rating: number): number => {
  return Math.min(Math.max(1, rating), 10);
};

const transformBlogPost = (post: BlogPost): BlogPost => ({
  ...post,
  rating: normalizeRating(post.rating),
  createdAt: post.createdAt || new Date().toISOString(),
});

export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const { data } = await api.get<User[]>('/user', {
        params: { email },
      });
      const user = data[0];
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      return user;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  register: async (userData: Partial<User>): Promise<User> => {
    try {
      const { data } = await api.post<User>('/user', userData);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      const { data } = await api.put<User>(`/user/${userId}`, userData);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteUser: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/user/${userId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export const blogAPI = {
  getPosts: async (): Promise<BlogPost[]> => {
    try {
      const { data: users } = await api.get<User[]>('/user');
      
      if (!Array.isArray(users)) {
        throw new Error('Invalid response format from server');
      }

      const postsPromises = users.map(async (user) => {
        if (!user?.id) return [];
        
        try {
          const { data } = await api.get<BlogPost[]>(`/user/${user.id}/blogPost`);
          return Array.isArray(data) ? data.map(transformBlogPost) : [];
        } catch (error) {
          console.warn(`Failed to fetch posts for user ${user.id}:`, error);
          return [];
        }
      });

      const postsArrays = await Promise.all(postsPromises);
      return postsArrays.flat().sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserPosts: async (userId: string): Promise<BlogPost[]> => {
    try {
      const { data } = await api.get<BlogPost[]>(`/user/${userId}/blogPost`);
      return Array.isArray(data) 
        ? data.map(transformBlogPost).sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        : [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createPost: async (userId: string, postData: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      const { data } = await api.post<BlogPost>(`/user/${userId}/blogPost`, {
        ...postData,
        createdAt: new Date().toISOString(),
      });
      return transformBlogPost(data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updatePost: async (userId: string, postId: string, postData: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      const { data } = await api.put<BlogPost>(`/user/${userId}/blogPost/${postId}`, postData);
      return transformBlogPost(data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deletePost: async (userId: string, postId: string): Promise<void> => {
    try {
      await api.delete(`/user/${userId}/blogPost/${postId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};