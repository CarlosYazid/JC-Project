import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
}

/**
 * Display rating with stars and numeric value
 */
export const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating }) => (
  <div className="flex items-center space-x-1">
    <Star className="w-4 h-4 text-secondary" />
    <span>{rating}/10</span>
  </div>
);