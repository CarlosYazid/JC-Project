import { User, BlogPost } from '../types';
import { authAPI, blogAPI } from '../services/api';

// User-related functions
export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await authAPI.login('', '');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const saveUsers = async (user: Partial<User>): Promise<User | null> => {
  try {
    const { data } = await authAPI.register(user);
    return data;
  } catch (error) {
    console.error('Error saving user:', error);
    return null;
  }
};

// Blog post-related functions
export const getPosts = async (): Promise<BlogPost[]> => {
  try {
    return await blogAPI.getPosts();
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
};

export const savePosts = async (userId: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const { data } = await blogAPI.createPost(userId, post);
    return data;
  } catch (error) {
    console.error('Error saving post:', error);
    return null;
  }
};