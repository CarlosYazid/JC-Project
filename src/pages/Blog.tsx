import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types';
import { blogAPI } from '@/services/api';
import BlogCard from '@/components/BlogCard';
import FilterBar from '@/components/FilterBar';
import { FavoriteButton } from '@/components/BlogCard/FavoriteButton';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(0);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [socialFilter, setSocialFilter] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsRetrying(retryCount > 0);
      
      const fetchedPosts = await blogAPI.getPosts();
      
      if (Array.isArray(fetchedPosts)) {
        setPosts(fetchedPosts.filter(post => 
          post && post.id && post.location && post.review
        ));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRetry = () => {
    fetchPosts(1);
  };

  const handleEdit = (post: BlogPost) => {
    if (!post?.id) return;
    navigate('/dashboard', { state: { editPost: post } });
  };

  const handleDelete = async (postId: string) => {
    if (!user?.id || !postId) return;

    try {
      await blogAPI.deletePost(user.id.toString(), postId);
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="text-center">
        <ErrorMessage message={error} />
        {!isRetrying && (
          <button
            onClick={handleRetry}
            className="mt-4 btn btn-primary"
            disabled={isRetrying}
          >
            {isRetrying ? 'Retrying...' : 'Retry'}
          </button>
        )}
      </div>
    );
  }

  const filteredPosts = posts.filter(post => {
    if (!post?.id || !post.location || !post.review) return false;

    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      post.location.toLowerCase().includes(searchTerm) ||
      (post.name?.toLowerCase() || '').includes(searchTerm) ||
      post.review.toLowerCase().includes(searchTerm) ||
      (post.username?.toLowerCase() || '').includes(searchTerm);
    
    const matchesRating = post.rating >= rating;
    const matchesUser = !showUserPosts || post.userId === user?.id;
    const matchesContinent = !selectedContinent || post.continent === selectedContinent;
    const matchesUserFilter = !userFilter || 
      (post.username?.toLowerCase() || '').includes(userFilter.toLowerCase());

    let matchesSocial = true;
    if (isAuthenticated && user) {
      if (socialFilter === 'following') {
        matchesSocial = user.following?.includes(post.username) || false;
      } else if (socialFilter === 'followers') {
        matchesSocial = user.followers?.includes(post.username) || false;
      }
    }

    const matchesFavorites = !showFavorites || (user?.favorites?.includes(post.id) || false);

    return matchesSearch && matchesRating && matchesUser && 
           matchesContinent && matchesUserFilter && matchesSocial && matchesFavorites;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-6">Explore Destinations</h1>
        <FilterBar
          rating={rating}
          setRating={setRating}
          showUserPosts={showUserPosts}
          setShowUserPosts={setShowUserPosts}
          userId={user?.id}
          selectedContinent={selectedContinent}
          setSelectedContinent={setSelectedContinent}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          socialFilter={socialFilter}
          setSocialFilter={setSocialFilter}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          isAuthenticated={isAuthenticated}
        />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            isOwner={post.userId === user?.id}
            onEdit={() => handleEdit(post)}
            onDelete={() => handleDelete(post.id)}
            actions={isAuthenticated && <FavoriteButton postId={post.id} />}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No destinations found. Try different search criteria.
        </div>
      )}
    </div>
  );
};

export default Blog;