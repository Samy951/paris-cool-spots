// Types pour les différents types de spots
export type SpotType = 'park' | 'fountain' | 'activity' | 'pool' | 'library' | 'museum';

// Type pour les arrondissements de Paris
export type Arrondissement = 
  | '1er' | '2ème' | '3ème' | '4ème' | '5ème' | '6ème' | '7ème' | '8ème' | '9ème' | '10ème'
  | '11ème' | '12ème' | '13ème' | '14ème' | '15ème' | '16ème' | '17ème' | '18ème' | '19ème' | '20ème';

// Type pour les prix
export type PriceRange = 'gratuit' | 'moins-5' | '5-15' | '15-30' | 'plus-30';

// Interface principale pour un spot
export interface CoolSpot {
  id: string;
  name: string;
  type: SpotType;
  arrondissement: Arrondissement;
  address: string;
  description: string;
  priceRange: PriceRange;
  isOpen: boolean;
  openingHours: string;
  rating: number;
  features: string[];
  accessibility: boolean;
  hasShade: boolean;
  hasWater: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Interface pour les filtres
export interface FilterOptions {
  types: SpotType[];
  arrondissements: Arrondissement[];
  priceRanges: PriceRange[];
  openOnly: boolean;
  accessibleOnly: boolean;
  withShade: boolean;
  withWater: boolean;
  searchQuery: string;
}

// Interface pour l'état de l'application
export interface AppState {
  spots: CoolSpot[];
  filteredSpots: CoolSpot[];
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
}

// Interface pour les statistiques
export interface SpotStats {
  totalSpots: number;
  openSpots: number;
  freeSpots: number;
  accessibleSpots: number;
} 