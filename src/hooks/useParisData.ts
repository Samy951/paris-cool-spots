import { useQuery } from '@tanstack/react-query';
import { fetchEspacesVerts, fetchFontaines, fetchActivites, RawEspaceVert, RawFontaine, RawActivite } from '../services/api';
import { CoolSpot, SpotType, PriceRange, Arrondissement } from '../types';

// Fonctions de transformation des données hétérogènes vers notre modèle unifié
const transformEspaceVert = (raw: RawEspaceVert, recordId: string): CoolSpot => {
  const codePostal = raw.adresse_codepostal;
  const arrondissement = extractArrondissement(codePostal);
  const address = `${raw.adresse_numero || ''} ${raw.adresse_libellevoie || ''}, ${codePostal}`.trim();
  
  const coolSpot: CoolSpot = {
    id: recordId,
    name: raw.nom_ev || 'Espace vert',
    type: 'park',
    arrondissement,
    address,
    description: `${raw.type_ev} - ${raw.categorie}`,
    priceRange: 'gratuit',
    isOpen: true,
    openingHours: 'Variable selon la saison',
    rating: 4.0,
    features: ['Espace vert', 'Nature', 'Détente'],
    accessibility: true,
    hasShade: true,
    hasWater: false,
    coordinates: {
      lat: raw.geom_x_y[0],
      lng: raw.geom_x_y[1],
    },
  };
  
  return coolSpot;
};

const transformFontaine = (raw: RawFontaine, recordId: string): CoolSpot => {
  const commune = raw.commune || '';
  const arrondissement = extractArrondissementFromCommune(commune);
  
  const coolSpot: CoolSpot = {
    id: recordId,
    name: `Fontaine - ${raw.voie}`,
    type: 'fountain',
    arrondissement,
    address: `${raw.voie}, ${commune}`,
    description: `${raw.type_objet} - ${raw.modele}`,
    priceRange: 'gratuit',
    isOpen: raw.dispo === 'OUI',
    openingHours: '24h/24',
    rating: 4.5,
    features: ['Eau potable', 'Fontaine publique'],
    accessibility: true,
    hasShade: false,
    hasWater: true,
    coordinates: {
      lat: raw.geo_point_2d[0],
      lng: raw.geo_point_2d[1],
    },
  };
  
  return coolSpot;
};

const transformActivite = (raw: RawActivite, recordId: string): CoolSpot => {
  const codePostal = raw.address_zipcode;
  const arrondissement = extractArrondissement(codePostal);
  const priceRange = mapPriceType(raw.price_type);
  const address = `${raw.address_street || ''}, ${raw.address_city || ''} ${codePostal}`.trim();
  
  const coolSpot: CoolSpot = {
    id: recordId,
    name: raw.title,
    type: 'activity',
    arrondissement,
    address,
    description: raw.lead_text || raw.description,
    priceRange,
    isOpen: true,
    openingHours: 'Voir détails',
    rating: 4.2,
    features: ['Activité culturelle', 'Événement'],
    accessibility: true,
    hasShade: true,
    hasWater: false,
    coordinates: {
      lat: raw.lat_lon[0] || 48.8566,
      lng: raw.lat_lon[1] || 2.3522,
    },
  };
  
  return coolSpot;
};

// Fonctions utilitaires
const extractArrondissement = (codePostal: string): Arrondissement => {
  if (!codePostal || !codePostal.startsWith('75')) return '1er';
  
  const arrNum = codePostal.slice(-2);
  if (arrNum === '01') return '1er';
  if (arrNum === '20') return '20ème';
  return `${parseInt(arrNum)}ème` as Arrondissement;
};

const extractArrondissementFromCommune = (commune: string): Arrondissement => {
  const match = commune.match(/(\d+)EME/);
  if (!match) return '1er';
  
  const num = parseInt(match[1]);
  if (num === 1) return '1er';
  if (num === 20) return '20ème';
  return `${num}ème` as Arrondissement;
};

const mapPriceType = (priceType: string): PriceRange => {
  if (!priceType || priceType.toLowerCase().includes('gratuit')) return 'gratuit';
  if (priceType.toLowerCase().includes('payant')) return '5-15';
  return 'gratuit';
};

// Hooks personnalisés utilisant React Query
export const useEspacesVerts = () => {
  return useQuery({
    queryKey: ['espacesVerts'],
    queryFn: () => fetchEspacesVerts(100),
    select: (data) => 
      data.records.map((record) => 
        transformEspaceVert(record.fields, record.recordid)
      ),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useFontaines = () => {
  return useQuery({
    queryKey: ['fontaines'],
    queryFn: () => fetchFontaines(100),
    select: (data) => 
      data.records.map((record) => 
        transformFontaine(record.fields, record.recordid)
      ),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useActivites = () => {
  return useQuery({
    queryKey: ['activites'],
    queryFn: () => fetchActivites(50),
    select: (data) => 
      data.records.map((record) => 
        transformActivite(record.fields, record.recordid)
      ),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

// Hook pour combiner toutes les données
export const useAllParisSpots = () => {
  const espacesQuery = useEspacesVerts();
  const fontainesQuery = useFontaines();
  const activitesQuery = useActivites();

  const isLoading = espacesQuery.isLoading || fontainesQuery.isLoading || activitesQuery.isLoading;
  const isError = espacesQuery.isError || fontainesQuery.isError || activitesQuery.isError;
  const error = espacesQuery.error || fontainesQuery.error || activitesQuery.error;

  const data: CoolSpot[] = [
    ...(espacesQuery.data || []),
    ...(fontainesQuery.data || []),
    ...(activitesQuery.data || []),
  ];

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: () => {
      espacesQuery.refetch();
      fontainesQuery.refetch();
      activitesQuery.refetch();
    },
  };
}; 