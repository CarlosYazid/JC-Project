import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Globe, Edit2, Trash2 } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  onEdit,
  onDelete,
  isOwner,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card h-full flex flex-col"
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${post.imageUrl || `https://source.unsplash.com/random/800x600/?${post.location.replace(/\s+/g, '')}`})`,
        }}
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{post.name}</h3>
        
        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{post.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span>{post.continent}</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(post.rating / 2) ? 'var(--secondary)' : 'none'}
                stroke={i < Math.round(post.rating / 2) ? 'var(--secondary)' : 'currentColor'}
              />
            ))}
            <span className="ml-1 text-sm">({post.rating}/10)</span>
          </div>
        </div>

        <p className="text-gray-700 flex-1 mb-4">{post.review}</p>

        {isOwner && (
          <div className="flex gap-2 mt-auto">
            <button
              onClick={onEdit}
              className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <Edit2 size={16} />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};