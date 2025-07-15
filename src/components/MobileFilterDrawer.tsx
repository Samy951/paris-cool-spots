import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import FilterPanel from './FilterPanel';
import { FilterOptions } from '../types';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onReplaceFilters?: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  filterOptions: {
    types: Array<{ value: any; label: string; icon: string }>;
    priceRanges: Array<{ value: any; label: string; icon: string }>;
  };
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReplaceFilters,
  onResetFilters,
  filterOptions
}) => {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Bloquer le scroll du body quand ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6">
          <FilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            onReplaceFilters={onReplaceFilters}
            onResetFilters={onResetFilters}
            filterOptions={filterOptions}
          />
        </div>

        {/* Footer avec bouton appliquer */}
        <div className="border-t border-gray-200 px-4 py-4">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Appliquer les filtres
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer; 