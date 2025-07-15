import React from 'react';
import { Grid, List, MapPin, Clock, DollarSign, Accessibility, Filter } from 'lucide-react';
import { SpotStats } from '../types';

interface StatsBarProps {
  stats: SpotStats;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onMobileFilterToggle?: () => void;
  isMobileFilterOpen?: boolean;
}

const StatsBar: React.FC<StatsBarProps> = ({ 
  stats, 
  viewMode, 
  onViewModeChange, 
  onMobileFilterToggle,
  isMobileFilterOpen 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4 mb-6">
      <div className="flex items-center justify-between gap-3">
        {/* Statistiques */}
        <div className="flex items-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide pb-1 md:pb-0 flex-1 min-w-0">
          <div className="flex items-center text-xs md:text-sm text-gray-600 whitespace-nowrap">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 text-primary flex-shrink-0" />
            <span className="font-medium">{stats.totalSpots}</span>
            <span className="ml-1 hidden sm:inline">spots trouvés</span>
            <span className="ml-1 sm:hidden">spots</span>
          </div>
          
          <div className="flex items-center text-xs md:text-sm text-gray-600 whitespace-nowrap">
            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-green-500 flex-shrink-0" />
            <span className="font-medium">{stats.openSpots}</span>
            <span className="ml-1">ouverts</span>
          </div>
          
          <div className="flex items-center text-xs md:text-sm text-gray-600 whitespace-nowrap">
            <DollarSign className="h-3 w-3 md:h-4 md:w-4 mr-1 text-blue-500 flex-shrink-0" />
            <span className="font-medium">{stats.freeSpots}</span>
            <span className="ml-1">gratuits</span>
          </div>
          
          <div className="flex items-center text-xs md:text-sm text-gray-600 whitespace-nowrap">
            <Accessibility className="h-3 w-3 md:h-4 md:w-4 mr-1 text-purple-500 flex-shrink-0" />
            <span className="font-medium">{stats.accessibleSpots}</span>
            <span className="ml-1 hidden sm:inline">accessibles</span>
            <span className="ml-1 sm:hidden">PMR</span>
          </div>
        </div>

        {/* Boutons de vue et filtres mobile */}
        <div className="flex items-center space-x-2">
          {/* Bouton filtres mobile */}
          {onMobileFilterToggle && (
            <button
              onClick={onMobileFilterToggle}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isMobileFilterOpen
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Filtres"
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
          
          {/* Boutons de vue */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vue en grille"
            >
              <Grid className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vue en liste"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar; 