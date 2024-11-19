import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { User, MapPin, Users, UserPlus, UserMinus, Edit, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUsers, saveUsers, getPosts, savePosts } from '../utils/storage';
import BlogCard from '../components/BlogCard';

const UserProfile = () => {
  const { username } = useParams();
  const { user: currentUser, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  
  const users = getUsers();
  const profileUser = users.find(u => u.username === username);
  
  const userPosts = getPosts().filter(post => post.username === username);
  
  if (!profileUser) {
    return <Navigate to="/blog" replace />;
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const isFollowing = currentUser?.following?.includes(profileUser.username);
  
  const handleFollowToggle = () => {
    if (!currentUser) return;

    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          following: isFollowing
            ? u.following?.filter(username => username !== profileUser.username)
            : [...(u.following || []), profileUser.username]
        };
      }
      if (u.id === profileUser.id) {
        return {
          ...u,
          followers: isFollowing
            ? u.followers?.filter(username => username !== currentUser.username)
            : [...(u.followers || []), currentUser.username]
        };
      }
      return u;
    });

    saveUsers(updatedUsers);
    const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id);
    if (updatedCurrentUser) {
      login(updatedCurrentUser);
    }
  };

  const handleEditProfile = () => {
    navigate('/dashboard', { state: { activeTab: 'profile' } });
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    if (showFollowing) setShowFollowing(false);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    if (showFollowers) setShowFollowers(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
          <div className="flex items-start space-x-4 mb-4 md:mb-0">
            <div className="relative">
              {profileUser.profileImage ? (
                <img
                  src={profileUser.profileImage}
                  alt={profileUser.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="bg-gray-100 p-4 rounded-full">
                  <User className="w-16 h-16 text-gray-600" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profileUser.name}</h1>
              <p className="text-gray-600">@{profileUser.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated && !isOwnProfile && (
              <button
                onClick={handleFollowToggle}
                className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'} flex items-center space-x-2`}
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="w-4 h-4" />
                    <span>Unfollow</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            )}
            {isOwnProfile && isAuthenticated && (
              <button
                onClick={handleEditProfile}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {profileUser.bio && (
          <p className="text-gray-700 mt-2 mb-6 max-w-2xl">{profileUser.bio}</p>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{userPosts.length}</div>
            <div className="text-gray-600">Posts</div>
          </div>
          <button
            onClick={toggleFollowers}
            className="text-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
          >
            <div className="text-2xl font-bold">{profileUser.followers?.length || 0}</div>
            <div className="text-gray-600">Followers</div>
          </button>
          <button
            onClick={toggleFollowing}
            className="text-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
          >
            <div className="text-2xl font-bold">{profileUser.following?.length || 0}</div>
            <div className="text-gray-600">Following</div>
          </button>
        </div>

        {showFollowers && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Followers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profileUser.followers?.map(followerUsername => {
                const follower = users.find(u => u.username === followerUsername);
                return follower ? (
                  <Link
                    key={follower.username}
                    to={`/user/${follower.username}`}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {follower.profileImage ? (
                      <img
                        src={follower.profileImage}
                        alt={follower.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="font-medium">@{follower.username}</span>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {showFollowing && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Following</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profileUser.following?.map(followingUsername => {
                const following = users.find(u => u.username === followingUsername);
                return following ? (
                  <Link
                    key={following.username}
                    to={`/user/${following.username}`}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {following.profileImage ? (
                      <img
                        src={following.profileImage}
                        alt={following.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="font-medium">@{following.username}</span>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{userPosts.length} destinations shared</span>
        </div>
      </motion.div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shared Destinations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              isOwner={isOwnProfile}
              onEdit={() => navigate('/dashboard', { state: { editPost: post } })}
              onDelete={() => {
                const allPosts = getPosts();
                const updatedPosts = allPosts.filter(p => p.id !== post.id);
                savePosts(updatedPosts);
                window.location.reload();
              }}
              actions={
                currentUser && !isOwnProfile && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      By @{post.username}
                    </span>
                  </div>
                )
              }
            />
          ))}
        </div>
        {userPosts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No destinations shared yet.
          </div>
        )}
      </div>
    </div>
  );
};
export default UserProfile;