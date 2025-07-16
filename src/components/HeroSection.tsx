import React from 'react';
import { Droplets, Trees, Waves } from 'lucide-react';

interface HeroSectionProps {
  onQuickFilter: (preset: 'refresh' | 'relax' | 'activities') => void;
}

export default function HeroSection({ onQuickFilter }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
          🌡️ Il fait chaud à Paris ?
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-90">
          Trouvez votre îlot de fraîcheur
        </p>
        <p className="text-sm md:text-lg mb-6 md:mb-8 opacity-80 max-w-2xl mx-auto px-4">
          Découvrez les fontaines, parcs et activités rafraîchissantes 
          pour échapper à la chaleur parisienne
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center px-4">
          <button
            onClick={() => onQuickFilter('refresh')}
            className="bg-white text-purple-600 px-4 md:px-6 py-3 md:py-3 rounded-lg font-medium md:font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:min-w-48 sm:w-auto text-sm md:text-base"
          >
            <Droplets className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span>Je veux me rafraîchir</span>
          </button>
          
          <button
            onClick={() => onQuickFilter('relax')}
            className="bg-white text-purple-600 px-4 md:px-6 py-3 md:py-3 rounded-lg font-medium md:font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:min-w-48 sm:w-auto text-sm md:text-base"
          >
            <Trees className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span>Me détendre au frais</span>
          </button>
          
          <button
            onClick={() => onQuickFilter('activities')}
            className="bg-white text-purple-600 px-4 md:px-6 py-3 md:py-3 rounded-lg font-medium md:font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:min-w-48 sm:w-auto text-sm md:text-base"
          >
            <Waves className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span>Activités fraîches</span>
          </button>
        </div>
      </div>
    </div>
  );
} 