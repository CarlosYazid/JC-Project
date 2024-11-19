import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Layout, User, Globe } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BlogPost, Continent } from '../types';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import UserProfile from '../components/UserProfile';

const CONTINENTS: Continent[] = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America'
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const editPost = location.state?.editPost as BlogPost | undefined;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'profile'>('posts');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    review: '',
    rating: 5,
    imageUrl: '',
    continent: ''
  });

  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.id) {
        try {
          const userPosts = await blogAPI.getUserPosts(user.id.toString());
          setPosts(userPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPosts();
  }, [user?.id]);

  useEffect(() => {
    if (editPost) {
      setIsEditing(true);
      setEditingPost(editPost);
      setFormData({
        name: editPost.name || '',
        location: editPost.location,
        review: editPost.review,
        rating: editPost.rating,
        imageUrl: editPost.imageUrl || '',
        continent: editPost.continent || ''
      });
      setActiveTab('posts');
    }
  }, [editPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      if (isEditing && editingPost) {
        const updatedPost = await blogAPI.updatePost(
          user.id.toString(),
          editingPost.id,
          { ...formData }
        );
        setPosts(posts.map(post =>
          post.id === editingPost.id ? updatedPost : post
        ));
      } else {
        const newPost = await blogAPI.createPost(user.id.toString(), {
          ...formData,
          creator: user.name,
          username: user.username,
          userId: user.id,
          createdAt: new Date().toISOString()
        });
        setPosts([newPost, ...posts]);
      }

      setIsEditing(false);
      setEditingPost(null);
      setFormData({
        name: '',
        location: '',
        review: '',
        rating: 5,
        imageUrl: '',
        continent: ''
      });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true);
    setEditingPost(post);
    setFormData({
      name: post.name || '',
      location: post.location,
      review: post.review,
      rating: post.rating,
      imageUrl: post.imageUrl || '',
      continent: post.continent || ''
    });
  };

  const handleDelete = async (postId: string) => {
    if (!user?.id) return;

    try {
      await blogAPI.deletePost(user.id.toString(), postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('posts')}
            className={`btn ${activeTab === 'posts' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Layout className="w-4 h-4 mr-2" />
            My Posts
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        <UserProfile />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <form onSubmit={handleSubmit} className="card p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name (Optional)</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="input"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  className="input"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="input"
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  <Globe className="inline w-4 h-4 mr-1" />
                  Continent
                </label>
                <select
                  className="input"
                  value={formData.continent}
                  onChange={e => setFormData({...formData, continent: e.target.value})}
                  required
                >
                  <option value="">Select a continent</option>
                  {CONTINENTS.map((continent) => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Review</label>
              <textarea
                className="input"
                rows={4}
                value={formData.review}
                onChange={e => setFormData({...formData, review: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              {isEditing ? 'Update Destination' : 'Add Destination'}
            </button>
          </form>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                isOwner={true}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post.id)}
              />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
              You haven't added any destinations yet. Start sharing your adventures!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;