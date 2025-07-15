import React, { useState, useMemo } from 'react';
import { FilterOptions } from './types';
import { filterOptions } from './data/mockData';
import { useAllParisSpots } from './hooks/useParisData';
import { useDebounce } from './hooks/useDebounce';
import { usePagination } from './hooks/usePagination';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import SpotGrid from './components/SpotGrid';
import StatsBar from './components/StatsBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  // Utilisation des vraies APIs Paris Open Data via React Query
  const { data: spots = [], isLoading: loading, isError, error: queryError, refetch } = useAllParisSpots();
  const error = isError ? (queryError as Error)?.message || 'Erreur lors du chargement' : null;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // État des filtres
  const [filters, setFilters] = useState<FilterOptions>({
    types: [],
    arrondissements: [],
    priceRanges: [],
    openOnly: false,
    accessibleOnly: false,
    withShade: false,
    withWater: false,
    searchQuery: ''
  });

  // Les données sont maintenant gérées par React Query

  // Debounce de la recherche texte pour optimiser les performances
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);

  // Calcul des spots filtrés avec useMemo pour optimiser les performances
  const filteredSpots = useMemo(() => {
    return spots.filter(spot => {
      // Filtre par type
      if (filters.types.length > 0 && !filters.types.includes(spot.type)) {
        return false;
      }

      // Filtre par arrondissement
      if (filters.arrondissements.length > 0 && !filters.arrondissements.includes(spot.arrondissement)) {
        return false;
      }

      // Filtre par prix
      if (filters.priceRanges.length > 0 && !filters.priceRanges.includes(spot.priceRange)) {
        return false;
      }

      // Filtre par ouverture
      if (filters.openOnly && !spot.isOpen) {
        return false;
      }

      // Filtre par accessibilité
      if (filters.accessibleOnly && !spot.accessibility) {
        return false;
      }

      // Filtre par ombre
      if (filters.withShade && !spot.hasShade) {
        return false;
      }

      // Filtre par eau
      if (filters.withWater && !spot.hasWater) {
        return false;
      }

      // Filtre par recherche textuelle (avec debounce)
      if (debouncedSearchQuery.trim() !== '') {
        const query = debouncedSearchQuery.toLowerCase();
        const matchesName = spot.name.toLowerCase().includes(query);
        const matchesAddress = spot.address.toLowerCase().includes(query);
        const matchesDescription = spot.description.toLowerCase().includes(query);
        const matchesFeatures = spot.features.some(feature => 
          feature.toLowerCase().includes(query)
        );
        
        if (!matchesName && !matchesAddress && !matchesDescription && !matchesFeatures) {
          return false;
        }
      }

      return true;
    });
  }, [spots, filters, debouncedSearchQuery]);

  // Pagination pour optimiser le rendu de grandes listes
  const pagination = usePagination(filteredSpots, 24); // 24 spots par page (6x4 grid)

  // Statistiques calculées
  const stats = useMemo(() => ({
    totalSpots: filteredSpots.length,
    openSpots: filteredSpots.filter(spot => spot.isOpen).length,
    freeSpots: filteredSpots.filter(spot => spot.priceRange === 'gratuit').length,
    accessibleSpots: filteredSpots.filter(spot => spot.accessibility).length,
  }), [filteredSpots]);

  // Gestionnaires d'événements
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      types: [],
      arrondissements: [],
      priceRanges: [],
      openOnly: false,
      accessibleOnly: false,
      withShade: false,
      withWater: false,
      searchQuery: ''
    });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  // Affichage des erreurs
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ErrorMessage message={error} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <Header />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panneau de filtres */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              filterOptions={filterOptions}
            />
          </div>

          {/* Zone de contenu principal */}
          <div className="lg:col-span-3">
            {/* Barre de statistiques */}
            <StatsBar 
              stats={stats} 
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />

            {/* Grille de spots */}
            {loading ? (
              <LoadingSpinner />
            ) : filteredSpots.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  Aucun spot ne correspond à vos critères
                </div>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <SpotGrid spots={pagination.data} viewMode={viewMode} />
                
                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                      onClick={pagination.previousPage}
                      disabled={!pagination.hasPreviousPage}
                      className="px-3 py-2 bg-white border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Précédent
                    </button>
                    
                    <span className="text-sm text-gray-700">
                      Page {pagination.page} sur {pagination.totalPages} 
                      ({pagination.totalItems} spots au total)
                    </span>
                    
                    <button
                      onClick={pagination.nextPage}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-2 bg-white border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 