import { SpotType, PriceRange } from '../types';

// Configuration des options de filtres
export const filterOptions: {
  types: Array<{ value: SpotType; label: string; icon: string }>;
  priceRanges: Array<{ value: PriceRange; label: string; icon: string }>;
} = {
  types: [
    { value: 'park', label: 'Parcs & Jardins', icon: '🌳' },
    { value: 'fountain', label: 'Fontaines', icon: '⛲' },
    { value: 'activity', label: 'Activités', icon: '🏊' },
    { value: 'pool', label: 'Piscines', icon: '🏊‍♂️' },
    { value: 'library', label: 'Bibliothèques', icon: '📚' },
    { value: 'museum', label: 'Musées', icon: '🏛️' }
  ],
  priceRanges: [
    { value: 'gratuit', label: 'Gratuit', icon: '🆓' },
    { value: 'moins-5', label: 'Moins de 5€', icon: '💰' },
    { value: '5-15', label: '5€ - 15€', icon: '💰' },
    { value: '15-30', label: '15€ - 30€', icon: '💰💰' },
    { value: 'plus-30', label: 'Plus de 30€', icon: '💰💰💰' }
  ]
}; 