import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Key, Bookmark, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI, blogAPI } from '../services/api';
import BlogCard from './BlogCard';

const UserProfile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites'>('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    bio: user?.bio || '',
    profileImage: user?.profileImage || ''
  });
  const [favoritesPosts, setFavoritesPosts] = useState<any[]>([]);

  React.useEffect(() => {
    if (user?.favorites?.length) {
      const fetchFavorites = async () => {
        try {
          const posts = await blogAPI.getPosts();
          setFavoritesPosts(posts.filter(post => 
            user.favorites?.includes(post.id)
          ));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };
      fetchFavorites();
    }
  }, [user?.favorites]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        profileImage: formData.profileImage,
        ...(formData.password && { password: formData.password })
      };

      const response = await authAPI.updateUser(user.id.toString(), updatedUser);
      login(response);
      setIsEditing(false);
      setFormData({ ...formData, password: '' });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`btn ${activeTab === 'favorites' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Favorites
        </button>
      </div>

      {activeTab === 'profile' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-secondary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    className="input pl-10"
                    value={formData.profileImage}
                    onChange={e => setFormData({...formData, profileImage: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="input pl-10"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    className="input pl-10"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  className="input"
                  rows={4}
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password (leave blank to keep current)
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    className="input pl-10"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    minLength={6}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{user?.email}</span>
              </div>
              {user?.bio && (
                <div className="text-gray-700 mt-2">
                  {user.bio}
                </div>
              )}
              <div className="text-sm text-gray-500">
                Member since {new Date(user?.createdAt || '').toLocaleDateString()}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Favorite Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritesPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {favoritesPosts.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
              No favorite destinations yet. Start exploring and bookmark places you love!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;