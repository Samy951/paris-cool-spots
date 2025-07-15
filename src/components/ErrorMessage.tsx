import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Erreur de chargement
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="btn-primary inline-flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Réessayer
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage; 