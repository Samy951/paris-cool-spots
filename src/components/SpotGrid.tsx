import React from 'react';
import { CoolSpot } from '../types';
import SpotCard from './SpotCard';

interface SpotGridProps {
  spots: CoolSpot[];
  viewMode: 'grid' | 'list';
}

const SpotGrid: React.FC<SpotGridProps> = ({ spots, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {spots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} viewMode="grid" />
      ))}
    </div>
  );
};

export default SpotGrid; 