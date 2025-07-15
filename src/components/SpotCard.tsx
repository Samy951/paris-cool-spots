import React from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Accessibility,
  Droplets,
  TreePine,
  Circle
} from 'lucide-react';
import { CoolSpot } from '../types';

interface SpotCardProps {
  spot: CoolSpot;
  viewMode: 'grid' | 'list';
}

const SpotCard: React.FC<SpotCardProps> = ({ spot, viewMode }) => {
  // Fonction pour obtenir l'icône selon le type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'park':
        return <TreePine className="h-5 w-5" />;
      case 'fountain':
        return <Droplets className="h-5 w-5" />;
      case 'activity':
        return <Circle className="h-5 w-5" />;
      case 'pool':
        return <Circle className="h-5 w-5" />;
      case 'library':
        return <Circle className="h-5 w-5" />;
      case 'museum':
        return <Circle className="h-5 w-5" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  // Fonction pour obtenir le nom français du type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'park':
        return 'Parc';
      case 'fountain':
        return 'Fontaine';
      case 'activity':
        return 'Activité';
      case 'pool':
        return 'Piscine';
      case 'library':
        return 'Bibliothèque';
      case 'museum':
        return 'Musée';
      default:
        return type;
    }
  };

  // Fonction pour obtenir la couleur selon le type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'park':
        return 'text-green-600 bg-green-50';
      case 'fountain':
        return 'text-blue-600 bg-blue-50';
      case 'activity':
        return 'text-orange-600 bg-orange-50';
      case 'pool':
        return 'text-cyan-600 bg-cyan-50';
      case 'library':
        return 'text-purple-600 bg-purple-50';
      case 'museum':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Fonction pour obtenir le label du prix
  const getPriceLabel = (priceRange: string) => {
    switch (priceRange) {
      case 'gratuit':
        return 'Gratuit';
      case 'moins-5':
        return 'Moins de 5€';
      case '5-15':
        return '5€ - 15€';
      case '15-30':
        return '15€ - 30€';
      case 'plus-30':
        return 'Plus de 30€';
      default:
        return priceRange;
    }
  };

  // Fonction pour obtenir la couleur du prix
  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case 'gratuit':
        return 'text-green-600 bg-green-50';
      case 'moins-5':
        return 'text-blue-600 bg-blue-50';
      case '5-15':
        return 'text-yellow-600 bg-yellow-50';
      case '15-30':
        return 'text-orange-600 bg-orange-50';
      case 'plus-30':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Générer les étoiles pour le rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${getTypeColor(spot.type)}`}>
                {getTypeIcon(spot.type)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{spot.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(spot.type)}`}>
                    {getTypeLabel(spot.type)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriceColor(spot.priceRange)}`}>
                    {getPriceLabel(spot.priceRange)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{spot.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>{spot.openingHours}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    spot.isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {spot.isOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(spot.rating)}
                  <span className="text-sm text-gray-600 ml-2">({spot.rating})</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {spot.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {spot.accessibility && (
                    <div className="flex items-center gap-1 text-xs text-purple-600">
                      <Accessibility className="h-3 w-3" />
                      <span>Accessible</span>
                    </div>
                  )}
                  {spot.hasWater && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Droplets className="h-3 w-3" />
                      <span>Point d'eau</span>
                    </div>
                  )}
                  {spot.hasShade && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TreePine className="h-3 w-3" />
                      <span>Ombragé</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {spot.features.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {spot.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mode grid
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${getTypeColor(spot.type)}`}>
          {getTypeIcon(spot.type)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{spot.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(spot.type)}`}>
              {getTypeLabel(spot.type)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              spot.isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {spot.isOpen ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{spot.address}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4" />
          <span>{spot.openingHours}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <DollarSign className="h-4 w-4" />
          <span className={`text-xs px-2 py-1 rounded-full ${getPriceColor(spot.priceRange)}`}>
            {getPriceLabel(spot.priceRange)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {spot.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(spot.rating)}
          <span className="text-sm text-gray-600 ml-2">({spot.rating})</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {spot.accessibility && (
            <div className="flex items-center gap-1 text-xs text-purple-600">
              <Accessibility className="h-3 w-3" />
              <span>Accessible</span>
            </div>
          )}
          {spot.hasWater && (
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <Droplets className="h-3 w-3" />
              <span>Point d'eau</span>
            </div>
          )}
          {spot.hasShade && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TreePine className="h-3 w-3" />
              <span>Ombragé</span>
            </div>
          )}
        </div>
      </div>

      {spot.features.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {spot.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {spot.features.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{spot.features.length - 3} autres
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotCard; 