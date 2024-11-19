import React from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '../types';
import { ImagePreview } from './ImagePreview';

interface PostFormProps {
  initialData?: BlogPost | null;
  onSave: (data: Partial<BlogPost>) => void;
  onCancel: () => void;
}

const continents = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
];

export const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [imageUrl, setImageUrl] = React.useState(initialData?.imageUrl || '');
  const [previewError, setPreviewError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const postData: Partial<BlogPost> = {
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      continent: formData.get('continent') as string,
      review: formData.get('review') as string,
      rating: parseInt(formData.get('rating') as string, 10),
      imageUrl: imageUrl || `https://source.unsplash.com/random/800x600/?${(formData.get('location') as string).replace(/\s+/g, '')}`,
    };

    onSave(postData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? 'Edit Destination' : 'Add New Destination'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Place Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={initialData?.name}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={initialData?.location}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="continent" className="block text-sm font-medium text-gray-700">
                Continent
              </label>
              <select
                id="continent"
                name="continent"
                defaultValue={initialData?.continent || ''}
                className="input"
                required
              >
                <option value="">Select a continent</option>
                {continents.map((continent) => (
                  <option key={continent} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating (1-10)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="10"
                defaultValue={initialData?.rating || 5}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL (optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewError(false);
                }}
                className="input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                Review
              </label>
              <textarea
                id="review"
                name="review"
                defaultValue={initialData?.review}
                className="input min-h-[150px]"
                required
              />
            </div>

            {imageUrl && (
              <ImagePreview
                url={imageUrl}
                onError={() => setPreviewError(true)}
                error={previewError}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {initialData ? 'Update' : 'Create'} Destination
          </button>
        </div>
      </form>
    </motion.div>
  );
};