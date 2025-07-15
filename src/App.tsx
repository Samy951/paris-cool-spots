import React, { useState, useEffect, useMemo } from 'react';
import { CoolSpot, FilterOptions } from './types';
import { mockSpots, filterOptions } from './data/mockData';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import SpotGrid from './components/SpotGrid';
import StatsBar from './components/StatsBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  // État global de l'application
  const [spots] = useState<CoolSpot[]>(mockSpots);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  // Simulation du chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

      // Filtre par recherche textuelle
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
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
  }, [spots, filters]);

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
        <ErrorMessage message={error} onRetry={() => setError(null)} />
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
              <SpotGrid spots={filteredSpots} viewMode={viewMode} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 