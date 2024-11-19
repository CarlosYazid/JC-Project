import { apiClient, handleApiRequest } from './base';
import { API_ENDPOINTS } from '@/constants';
import { validateRating } from '@/utils/validation';
import { retryOperation } from '@/utils/api';
import type { BlogPost, User } from '@/types';

/**
 * Blog post related API services
 */
export const blogAPI = {
  /**
   * Fetch all blog posts from all users
   */
  getPosts: async (): Promise<BlogPost[]> => {
    try {
      // First fetch all users with retry logic
      const { data: users } = await retryOperation(() => 
        handleApiRequest<User[]>(apiClient.get(API_ENDPOINTS.USERS))
      );

      if (!Array.isArray(users)) {
        console.error('Invalid users response:', users);
        return [];
      }

      // Then fetch posts for each user with retry logic
      const postsPromises = users.map(async user => {
        if (!user?.id) {
          console.warn('Invalid user object:', user);
          return [];
        }

        try {
          const { data } = await retryOperation(() =>
            handleApiRequest<BlogPost[]>(
              apiClient.get(API_ENDPOINTS.USER_POSTS(user.id.toString()))
            )
          );

          if (!Array.isArray(data)) {
            console.warn(`Invalid posts response for user ${user.id}:`, data);
            return [];
          }

          return data.map(post => ({
            ...post,
            rating: validateRating(post.rating),
            createdAt: new Date(post.createdAt || new Date()).toISOString(),
            userId: user.id,
            username: user.username || 'Unknown User'
          }));
        } catch (error) {
          console.warn(`Failed to fetch posts for user ${user.id}:`, error);
          return [];
        }
      });

      const postsArrays = await Promise.allSettled(postsPromises);
      const allPosts = postsArrays
        .filter((result): result is PromiseFulfilledResult<BlogPost[]> => 
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value)
        .filter(post => {
          if (!post.id || !post.location || !post.review) {
            console.warn('Invalid post object:', post);
            return false;
          }
          return true;
        });

      return allPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  /**
   * Fetch posts for a specific user
   */
  getUserPosts: async (userId: string): Promise<BlogPost[]> => {
    try {
      const { data } = await retryOperation(() =>
        handleApiRequest<BlogPost[]>(
          apiClient.get(API_ENDPOINTS.USER_POSTS(userId))
        )
      );

      if (!Array.isArray(data)) {
        console.warn('Invalid user posts response:', data);
        return [];
      }

      return data
        .filter(post => post.id && post.location && post.review)
        .map(post => ({
          ...post,
          rating: validateRating(post.rating),
          createdAt: new Date(post.createdAt || new Date()).toISOString()
        }));
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  },

  /**
   * Create a new blog post
   */
  createPost: async (userId: string, postData: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      if (!postData.location || !postData.review) {
        throw new Error('Missing required post data');
      }

      const { data } = await retryOperation(() =>
        handleApiRequest<BlogPost>(
          apiClient.post(API_ENDPOINTS.USER_POSTS(userId), {
            ...postData,
            rating: validateRating(postData.rating || 5),
            createdAt: new Date().toISOString()
          })
        )
      );

      if (!data.id) {
        throw new Error('Invalid response from server');
      }

      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  /**
   * Update an existing blog post
   */
  updatePost: async (userId: string, postId: string, postData: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      if (!postData.location || !postData.review) {
        throw new Error('Missing required post data');
      }

      const { data } = await retryOperation(() =>
        handleApiRequest<BlogPost>(
          apiClient.put(API_ENDPOINTS.USER_POST(userId, postId), {
            ...postData,
            rating: validateRating(postData.rating || 5)
          })
        )
      );

      if (!data.id) {
        throw new Error('Invalid response from server');
      }

      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  /**
   * Delete a blog post
   */
  deletePost: async (userId: string, postId: string): Promise<void> => {
    try {
      await retryOperation(() =>
        handleApiRequest<void>(
          apiClient.delete(API_ENDPOINTS.USER_POST(userId, postId))
        )
      );
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
};