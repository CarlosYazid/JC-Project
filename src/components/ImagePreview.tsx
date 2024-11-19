import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
  onError: () => void;
  error: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ url, onError, error }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg text-red-500">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} />
          <span>Invalid image URL</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
      <img
        src={url}
        alt="Preview"
        onError={onError}
        className="w-full h-full object-cover"
      />
    </div>
  );
};