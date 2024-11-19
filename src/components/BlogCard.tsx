import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
  actions?: React.ReactNode;
}

const BlogCard = ({ post, onEdit, onDelete, isOwner, actions }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.location}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {post.name || post.location}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-secondary" />
            <span>{post.rating}/10</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{post.location}</span>
          </div>
          <div className="flex items-center text-primary">
            <Globe className="w-4 h-4 mr-1" />
            <span>{post.continent}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{post.review}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <Link to={`/user/${post.username}`} className="hover:text-primary">
            By @{post.username}
          </Link>
        </div>

        {(isOwner || actions) && (
          <div className="flex justify-end space-x-2 mt-4">
            {actions}
            {isOwner && (
              <>
                <button
                  onClick={onEdit}
                  className="btn btn-secondary text-sm px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogCard;