import React from 'react';
import { Droplets, Trees, Waves } from 'lucide-react';

interface HeroSectionProps {
  onQuickFilter: (preset: 'refresh' | 'relax' | 'activities') => void;
}

export default function HeroSection({ onQuickFilter }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Nexa, sans-serif' }}>
          🌡️ Il fait chaud à Paris ?
        </h1>
        <p className="text-xl md:text-2xl mb-2 opacity-90">
          Trouvez votre îlot de fraîcheur
        </p>
        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
          Découvrez les fontaines, parcs et activités rafraîchissantes 
          pour échapper à la chaleur parisienne
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onQuickFilter('refresh')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 min-w-48"
          >
            <Droplets className="w-5 h-5" />
            Je veux me rafraîchir
          </button>
          
          <button
            onClick={() => onQuickFilter('relax')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 min-w-48"
          >
            <Trees className="w-5 h-5" />
            Me détendre au frais
          </button>
          
          <button
            onClick={() => onQuickFilter('activities')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 min-w-48"
          >
            <Waves className="w-5 h-5" />
            Activités fraîches
          </button>
        </div>
      </div>
    </div>
  );
} 