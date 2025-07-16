import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Accessibility,
  Navigation,
  Thermometer,
  Droplets,
  Trees,
  Calendar
} from 'lucide-react';
import { CoolSpot } from '../types';

interface SpotModalProps {
  spot: CoolSpot;
  isOpen: boolean;
  onClose: () => void;
}

const SpotModal: React.FC<SpotModalProps> = ({ spot, isOpen, onClose }) => {
  // Fermer le modal avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le scroll du body quand le modal est ouvert
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fonction pour obtenir l'icône selon le type avec focus "fraîcheur"
  const getTypeIcon = (type: string) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case 'park':
        return <Trees className={iconClass} />;
      case 'fountain':
        return <Droplets className={iconClass} />;
      case 'activity':
        return <Calendar className={iconClass} />;
      case 'pool':
        return <Droplets className={iconClass} />;
      default:
        return <MapPin className={iconClass} />;
    }
  };

  // Fonction pour obtenir la couleur selon le type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'park':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'fountain':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'activity':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'pool':
        return 'text-cyan-600 bg-cyan-50 border-cyan-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Générer les badges de fraîcheur
  const getCoolnessBadges = () => {
    const badges = [];
    
    if (spot.hasWater) {
      badges.push(
        <span key="water" className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
          <Droplets className="h-4 w-4" />
          💧 Fraîcheur
        </span>
      );
    }
    
    if (spot.hasShade) {
      badges.push(
        <span key="shade" className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
          <Trees className="h-4 w-4" />
          🌳 Ombragé
        </span>
      );
    }
    
    if (spot.type === 'fountain') {
      badges.push(
        <span key="cooling" className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium border border-cyan-200">
          <Thermometer className="h-4 w-4" />
          ❄️ Rafraîchissant
        </span>
      );
    }
    
    return badges;
  };



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

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case 'gratuit':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moins-5':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case '5-15':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case '15-30':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'plus-30':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

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
      default:
        return type;
    }
  };

  const openInMaps = () => {
    const { lat, lng } = spot.coordinates;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 ease-out scale-100 opacity-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${getTypeColor(spot.type)}`}>
                {getTypeIcon(spot.type)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {spot.name}
                </h2>
                <span className={`inline-block text-sm px-3 py-1 rounded-full border ${getTypeColor(spot.type)}`}>
                  {getTypeLabel(spot.type)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status et Badges de fraîcheur */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`inline-block text-sm px-3 py-1 rounded-full ${
                spot.isOpen ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200'
              }`}>
                {spot.isOpen ? '🟢 Ouvert' : '🔴 Fermé'}
              </span>
              
              <span className={`inline-block text-sm px-3 py-1 rounded-full border ${getPriceColor(spot.priceRange)}`}>
                {getPriceLabel(spot.priceRange)}
              </span>
            </div>

            {/* Badges de fraîcheur */}
            {getCoolnessBadges().length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">🌡️ Niveau de fraîcheur</h4>
                <div className="flex flex-wrap gap-2">
                  {getCoolnessBadges()}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <div className="text-gray-600 leading-relaxed space-y-2">
              {spot.description.split('\n').filter(line => line.trim()).map((paragraph, index) => (
                <p key={index} className="text-sm">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">📍 Informations pratiques</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">{spot.address}</div>
                    <div className="text-sm text-gray-500">{spot.arrondissement} arrondissement</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{spot.openingHours}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">♿ Accessibilité</h4>
              <div className="space-y-3">
                {spot.accessibility && (
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Accessibility className="h-4 w-4" />
                    <span>Accessible PMR</span>
                  </div>
                )}
                {!spot.accessibility && (
                  <div className="text-sm text-gray-500">
                    <span>Informations d'accessibilité non disponibles</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Caractéristiques */}
          {spot.features.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">✨ Caractéristiques</h4>
              <div className="flex flex-wrap gap-2">
                {spot.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full border"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openInMaps}
                className="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="h-5 w-5" />
                Ouvrir dans Maps
              </button>
              
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotModal; 