import React from 'react';
import { Grid, List, MapPin, Clock, DollarSign, Accessibility } from 'lucide-react';
import { SpotStats } from '../types';

interface StatsBarProps {
  stats: SpotStats;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const StatsBar: React.FC<StatsBarProps> = ({ stats, viewMode, onViewModeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Statistiques */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">{stats.totalSpots}</span>
            <span className="ml-1">spots trouvés</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1 text-green-500" />
            <span className="font-medium">{stats.openSpots}</span>
            <span className="ml-1">ouverts</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-1 text-blue-500" />
            <span className="font-medium">{stats.freeSpots}</span>
            <span className="ml-1">gratuits</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Accessibility className="h-4 w-4 mr-1 text-purple-500" />
            <span className="font-medium">{stats.accessibleSpots}</span>
            <span className="ml-1">accessibles</span>
          </div>
        </div>

        {/* Boutons de vue */}
        <div className="flex items-center space-x-2">
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
  );
};

export default StatsBar; 