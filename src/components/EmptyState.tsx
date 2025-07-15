import React from 'react';
import { 
  SearchX, 
  Lightbulb, 
  MapPin, 
  Droplets, 
  Trees, 
  Zap,
  Clock
} from 'lucide-react';
import { FilterOptions } from '../types';

interface EmptyStateProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Analyse des filtres pour suggestions intelligentes
  const getSmartSuggestions = () => {
    const suggestions = [];

    // Si pas de résultats avec types spécifiques
    if (filters.types.length > 0) {
      if (filters.types.includes('fountain')) {
        suggestions.push({
          title: "Essayez les parcs ombragés",
          description: "Peut-être qu'un parc avec de l'ombre vous rafraîchira ?",
          icon: <Trees className="h-5 w-5" />,
          action: () => onFilterChange({ 
            types: ['park'], 
            withShade: true,
            withWater: false 
          })
        });
      }
      
      if (filters.types.includes('park')) {
        suggestions.push({
          title: "Cherchez des fontaines",
          description: "Les fontaines offrent une fraîcheur immédiate",
          icon: <Droplets className="h-5 w-5" />,
          action: () => onFilterChange({ 
            types: ['fountain'], 
            withWater: true,
            withShade: false 
          })
        });
      }

      if (filters.types.includes('pool') || filters.types.includes('activity')) {
        suggestions.push({
          title: "Explorez tous les types",
          description: "Élargissez votre recherche à tous les spots",
          icon: <MapPin className="h-5 w-5" />,
          action: () => onFilterChange({ types: [] })
        });
      }
    }

    // Si filtres par arrondissement trop restrictifs
    if (filters.arrondissements.length > 0 && filters.arrondissements.length <= 3) {
      suggestions.push({
        title: "Élargissez la zone",
        description: "Recherchez dans tous les arrondissements",
        icon: <MapPin className="h-5 w-5" />,
        action: () => onFilterChange({ arrondissements: [] })
      });
    }

    // Si filtres "ouvert seulement" actif
    if (filters.openOnly) {
      suggestions.push({
        title: "Incluez les lieux fermés",
        description: "Peut-être que certains lieux rouvriront bientôt ?",
        icon: <Clock className="h-5 w-5" />,
        action: () => onFilterChange({ openOnly: false })
      });
    }

    // Si filtres gratuit actif
    if (filters.priceRanges.length > 0 && filters.priceRanges.includes('gratuit')) {
      suggestions.push({
        title: "Acceptez un petit budget",
        description: "Explorez les options à moins de 5€",
        icon: <Zap className="h-5 w-5" />,
        action: () => onFilterChange({ 
          priceRanges: ['gratuit', 'moins-5'] 
        })
      });
    }

    // Si recherche textuelle
    if (filters.searchQuery.trim() !== '') {
      suggestions.push({
        title: "Effacez la recherche",
        description: "Votre terme de recherche est peut-être trop spécifique",
        icon: <SearchX className="h-5 w-5" />,
        action: () => onFilterChange({ searchQuery: '' })
      });
    }

    // Suggestions par défaut si aucune suggestion spécifique
    if (suggestions.length === 0) {
      suggestions.push(
        {
          title: "Cherchez des fontaines",
          description: "Fraîcheur garantie avec les points d'eau",
          icon: <Droplets className="h-5 w-5" />,
          action: () => onFilterChange({ 
            types: ['fountain'], 
            withWater: true 
          })
        },
        {
          title: "Explorez les parcs",
          description: "Détente et ombre dans les espaces verts",
          icon: <Trees className="h-5 w-5" />,
          action: () => onFilterChange({ 
            types: ['park'], 
            withShade: true 
          })
        }
      );
    }

    return suggestions.slice(0, 3); // Max 3 suggestions
  };

  const suggestions = getSmartSuggestions();

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Icône et message principal */}
        <div className="mb-8">
          <SearchX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun spot trouvé
          </h3>
          <p className="text-gray-600">
            Pas de panique ! Voici quelques suggestions pour trouver votre oasis de fraîcheur :
          </p>
        </div>

        {/* Suggestions intelligentes */}
        <div className="space-y-3 mb-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={suggestion.action}
              className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="text-blue-600 group-hover:text-blue-700 mt-0.5">
                  {suggestion.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    {suggestion.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bouton de réinitialisation */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Lightbulb className="h-4 w-4" />
            Voir tous les spots
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState; 