import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  RotateCcw,
  Droplets,
  Trees,
  Waves,
  Zap
} from 'lucide-react';
import { FilterOptions, SpotType, Arrondissement, PriceRange } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onReplaceFilters?: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  filterOptions: {
    types: Array<{ value: SpotType; label: string; icon: string }>;
    priceRanges: Array<{ value: PriceRange; label: string; icon: string }>;
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReplaceFilters,
  onResetFilters,
  filterOptions
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    types: true,
    location: true,
    price: true,
    options: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const arrondissements: Arrondissement[] = [
    '1er', '2ème', '3ème', '4ème', '5ème', '6ème', '7ème', '8ème', '9ème', '10ème',
    '11ème', '12ème', '13ème', '14ème', '15ème', '16ème', '17ème', '18ème', '19ème', '20ème'
  ];

  const handleTypeToggle = (type: SpotType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFilterChange({ types: newTypes });
  };

  // Presets contextuels pour les "cool spots"
  const coolSpotPresets = [
    {
      id: 'refresh',
      label: 'Se rafraîchir',
      icon: <Droplets className="h-4 w-4" />,
      description: 'Fontaines et points d\'eau',
      filters: {
        types: ['fountain' as SpotType],
        withWater: true,
        openOnly: true
      }
    },
    {
      id: 'relax',
      label: 'Se détendre',
      icon: <Trees className="h-4 w-4" />,
      description: 'Parcs et espaces verts ombragés',
      filters: {
        types: ['park' as SpotType],
        withShade: true,
        priceRanges: ['gratuit' as PriceRange]
      }
    },
    {
      id: 'activities',
      label: 'Activités fraîches',
      icon: <Waves className="h-4 w-4" />,
      description: 'Piscines et activités aquatiques',
      filters: {
        types: ['pool' as SpotType, 'activity' as SpotType],
        openOnly: true
      }
    },
    {
      id: 'free',
      label: 'Gratuit et frais',
      icon: <Zap className="h-4 w-4" />,
      description: 'Tous les spots gratuits',
      filters: {
        priceRanges: ['gratuit' as PriceRange],
        openOnly: true
      }
    }
  ];

  const applyPreset = (preset: typeof coolSpotPresets[0]) => {
    // Remplace complètement les filtres par le preset
    const completeFilters = {
      types: preset.filters.types || [],
      arrondissements: [],
      priceRanges: preset.filters.priceRanges || [],
      openOnly: preset.filters.openOnly || false,
      accessibleOnly: false,
      withShade: preset.filters.withShade || false,
      withWater: preset.filters.withWater || false,
      searchQuery: ''
    };

    if (onReplaceFilters) {
      onReplaceFilters(completeFilters);
    } else {
      onFilterChange(completeFilters);
    }
  };

  const handleArrondissementToggle = (arr: Arrondissement) => {
    const newArrondissements = filters.arrondissements.includes(arr)
      ? filters.arrondissements.filter(a => a !== arr)
      : [...filters.arrondissements, arr];
    onFilterChange({ arrondissements: newArrondissements });
  };

  const handlePriceToggle = (price: PriceRange) => {
    const newPrices = filters.priceRanges.includes(price)
      ? filters.priceRanges.filter(p => p !== price)
      : [...filters.priceRanges, price];
    onFilterChange({ priceRanges: newPrices });
  };

  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    sectionKey: string; 
    children: React.ReactNode; 
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3">{children}</div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        </div>
        <button
          onClick={onResetFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Réinitialiser
        </button>
      </div>

      {/* Presets contextuels "Cool Spots" */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recherches populaires</h3>
        <div className="grid grid-cols-2 gap-2">
          {coolSpotPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="p-3 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-colors text-left group"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="text-purple-600 group-hover:text-purple-700">
                  {preset.icon}
                </div>
                <span className="text-sm font-medium text-gray-900">{preset.label}</span>
              </div>
              <p className="text-xs text-gray-600">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un spot..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Types de spots */}
      <FilterSection title="Types de spots" sectionKey="types">
        <div className="space-y-2">
          {filterOptions.types.map((type) => (
            <label key={type.value} className="filter-item cursor-pointer">
              <div className="flex items-center">
                <span className="text-lg mr-2">{type.icon}</span>
                <span className="text-sm text-gray-700">{type.label}</span>
              </div>
              <input
                type="checkbox"
                checked={filters.types.includes(type.value)}
                onChange={() => handleTypeToggle(type.value)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Arrondissements */}
      <FilterSection title="Arrondissements" sectionKey="location">
        <div className="grid grid-cols-4 gap-2">
          {arrondissements.map((arr) => (
            <button
              key={arr}
              onClick={() => handleArrondissementToggle(arr)}
              className={`text-xs py-1 px-2 rounded text-center transition-colors ${
                filters.arrondissements.includes(arr)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {arr}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Prix */}
      <FilterSection title="Prix" sectionKey="price">
        <div className="space-y-2">
          {filterOptions.priceRanges.map((price) => (
            <label key={price.value} className="filter-item cursor-pointer">
              <div className="flex items-center">
                <span className="text-lg mr-2">{price.icon}</span>
                <span className="text-sm text-gray-700">{price.label}</span>
              </div>
              <input
                type="checkbox"
                checked={filters.priceRanges.includes(price.value)}
                onChange={() => handlePriceToggle(price.value)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Options */}
      <FilterSection title="Options" sectionKey="options">
        <div className="space-y-3">
          <label className="filter-item cursor-pointer">
            <span className="text-sm text-gray-700">Ouvert maintenant</span>
            <input
              type="checkbox"
              checked={filters.openOnly}
              onChange={(e) => onFilterChange({ openOnly: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </label>
          
          <label className="filter-item cursor-pointer">
            <span className="text-sm text-gray-700">Accessible PMR</span>
            <input
              type="checkbox"
              checked={filters.accessibleOnly}
              onChange={(e) => onFilterChange({ accessibleOnly: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </label>
          
          <label className="filter-item cursor-pointer">
            <span className="text-sm text-gray-700">Avec ombre</span>
            <input
              type="checkbox"
              checked={filters.withShade}
              onChange={(e) => onFilterChange({ withShade: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </label>
          
          <label className="filter-item cursor-pointer">
            <span className="text-sm text-gray-700">Avec point d'eau</span>
            <input
              type="checkbox"
              checked={filters.withWater}
              onChange={(e) => onFilterChange({ withWater: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </label>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterPanel; 