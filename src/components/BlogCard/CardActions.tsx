import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface CardActionsProps {
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  actions?: React.ReactNode;
}

/**
 * Action buttons for blog card (edit, delete, custom actions)
 */
export const CardActions: React.FC<CardActionsProps> = ({
  isOwner,
  onEdit,
  onDelete,
  actions
}) => {
  if (!isOwner && !actions) return null;

  return (
    <div className="flex justify-end space-x-2 mt-4">
      {actions}
      {isOwner && (
        <>
          <button
            onClick={onEdit}
            className="btn btn-secondary text-sm px-3 py-1"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </>
      )}
    </div>
  );
};