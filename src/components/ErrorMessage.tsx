import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex items-center gap-2 text-red-600">
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  </div>
);