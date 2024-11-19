import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Globe, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/formatting';
import { DEFAULT_IMAGES } from '@/constants';
import type { BlogPost } from '@/types';
import { CardActions } from './CardActions';
import { RatingDisplay } from './RatingDisplay';

interface BlogCardProps {
  post: BlogPost;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
  actions?: React.ReactNode;
}

/**
 * Card component for displaying blog posts
 */
const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onEdit,
  onDelete,
  isOwner,
  actions
}) => {
  const imageUrl = post.imageUrl || DEFAULT_IMAGES.POST(post.location);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={post.location}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {post.name || post.location}
          </h3>
          <RatingDisplay rating={post.rating} />
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
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <Link 
            to={`/user/${post.username}`} 
            className="hover:text-primary transition-colors"
          >
            By @{post.username}
          </Link>
        </div>

        <CardActions
          isOwner={isOwner}
          onEdit={onEdit}
          onDelete={onDelete}
          actions={actions}
        />
      </div>
    </motion.div>
  );
};

export default BlogCard;