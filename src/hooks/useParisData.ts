import { useQuery } from '@tanstack/react-query';
import { fetchEspacesVerts, fetchFontaines, fetchActivites, RawEspaceVert, RawFontaine, RawActivite } from '../services/api';
import { CoolSpot, PriceRange, Arrondissement, SpotType } from '../types';

// Fonction pour nettoyer et formater les descriptions HTML
const cleanHtmlDescription = (htmlText: string): string => {
  if (!htmlText) return '';
  
  // Supprime les balises HTML et formate le texte
  let cleanText = htmlText
    // Remplace les balises de titre par des retours à la ligne
    .replace(/<h[1-6][^>]*>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    // Remplace les paragraphes par des retours à la ligne
    .replace(/<p[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    // Remplace les <br> par des retours à la ligne
    .replace(/<br\s*\/?>/gi, '\n')
    // Supprime toutes les autres balises HTML
    .replace(/<[^>]*>/g, '')
    // Décode les entités HTML communes
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Nettoie les espaces multiples et les retours à la ligne excessifs
    .replace(/\n\s*\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim();
    
  return cleanText;
};

// Fonctions utilitaires pour analyser les activités
const detectActivityType = (title: string, description: string = '', leadText: string = ''): SpotType => {
  const text = `${title} ${description} ${leadText}`.toLowerCase();
  
  // Détection de piscines - vérification plus stricte
  if (text.includes('piscine') || text.includes('centre aquatique') || text.includes('natation') || 
      text.includes('baignade') || (text.includes('aqua') && !text.includes('exposition'))) {
    return 'pool';
  }
  
  // Détection de bibliothèques - priorité haute pour éviter confusion avec musées
  if (text.includes('bibliothèque') || text.includes('médiathèque') || 
      (text.includes('library') && !text.includes('exposition'))) {
    return 'library';
  }
  
  // Détection de musées - vérification plus stricte
  if (text.includes('musée') || text.includes('museum') || 
      (text.includes('exposition') && (text.includes('visite') || text.includes('galerie') || text.includes('collection'))) ||
      text.includes('galerie d\'art') || text.includes('patrimoine')) {
    return 'museum';
  }
  
  // Par défaut, activité générale
  return 'activity';
};

const getActivityFeatures = (type: SpotType, title: string, description: string = ''): string[] => {
  const baseFeatures = ['Activité'];
  const text = `${title} ${description}`.toLowerCase();
  
  switch (type) {
    case 'pool':
      const poolFeatures = ['Piscine', 'Activité aquatique'];
      if (text.includes('couverte') || text.includes('indoor')) poolFeatures.push('Piscine couverte');
      if (text.includes('extérieure') || text.includes('outdoor')) poolFeatures.push('Piscine extérieure');
      if (text.includes('chauffée')) poolFeatures.push('Eau chauffée');
      return poolFeatures;
      
    case 'museum':
      const museumFeatures = ['Musée', 'Culture'];
      if (text.includes('art')) museumFeatures.push('Art');
      if (text.includes('histoire')) museumFeatures.push('Histoire');
      if (text.includes('science')) museumFeatures.push('Sciences');
      if (text.includes('exposition')) museumFeatures.push('Expositions');
      return museumFeatures;
      
    case 'library':
      const libraryFeatures = ['Bibliothèque', 'Lecture'];
      if (text.includes('numérique')) libraryFeatures.push('Ressources numériques');
      if (text.includes('enfant')) libraryFeatures.push('Section jeunesse');
      if (text.includes('wifi')) libraryFeatures.push('WiFi');
      return libraryFeatures;
      
    default:
      const activityFeatures = [...baseFeatures, 'Événement'];
      if (text.includes('concert')) activityFeatures.push('Concert');
      if (text.includes('théâtre')) activityFeatures.push('Théâtre');
      if (text.includes('atelier')) activityFeatures.push('Atelier');
      if (text.includes('spectacle')) activityFeatures.push('Spectacle');
      return activityFeatures;
  }
};

const getActivityAttributes = (type: SpotType): { hasShade: boolean; hasWater: boolean } => {
  switch (type) {
    case 'pool':
      return { hasShade: false, hasWater: true };
    case 'museum':
      return { hasShade: true, hasWater: false }; // Climatisé
    case 'library':
      return { hasShade: true, hasWater: false }; // Climatisé
    default:
      return { hasShade: true, hasWater: false };
  }
};

// Fonctions de transformation des données hétérogènes vers notre modèle unifié
const transformEspaceVert = (raw: RawEspaceVert, recordId: string): CoolSpot => {
  const codePostal = raw.adresse_codepostal;
  const arrondissement = extractArrondissement(codePostal);
  const address = `${raw.adresse_numero || ''} ${raw.adresse_libellevoie || ''}, ${codePostal}`.trim();
  
  // Détection si l'espace vert contient une piscine
  const name = raw.nom_ev || 'Espace vert';
  const description = `${raw.type_ev} - ${raw.categorie}`;
  const fullText = `${name} ${description}`.toLowerCase();
  
  const type: SpotType = fullText.includes('piscine') || fullText.includes('aquatique') || 
                         fullText.includes('natation') || fullText.includes('baignade') ? 'pool' : 'park';
  
  const features = type === 'pool' 
    ? ['Piscine', 'Espace vert', 'Activité aquatique']
    : ['Espace vert', 'Nature', 'Détente'];
    
  const hasWater = type === 'pool' || fullText.includes('fontaine') || fullText.includes('bassin');
  
  const coolSpot: CoolSpot = {
    id: recordId,
    name,
    type,
    arrondissement,
    address,
    description,
    priceRange: 'gratuit',
    isOpen: true,
    openingHours: 'Variable selon la saison',
    rating: 4.0,
    features,
    accessibility: true,
    hasShade: true,
    hasWater,
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
  const priceRange = mapPriceType(raw.price_type, raw.price_detail);
  const address = `${raw.address_street || ''}, ${raw.address_city || ''} ${codePostal}`.trim();
  
  // Détection intelligente du type basée sur le titre et la description
  const type = detectActivityType(raw.title, raw.description, raw.lead_text);
  const features = getActivityFeatures(type, raw.title, raw.description);
  const { hasShade, hasWater } = getActivityAttributes(type);
  
  // Nettoie la description HTML
  const rawDescription = raw.lead_text || raw.description || '';
  const cleanDescription = cleanHtmlDescription(rawDescription);
  
  const coolSpot: CoolSpot = {
    id: recordId,
    name: raw.title,
    type,
    arrondissement,
    address,
    description: cleanDescription,
    priceRange,
    isOpen: true,
    openingHours: 'Voir détails',
    rating: 4.2,
    features,
    accessibility: true,
    hasShade,
    hasWater,
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

const mapPriceType = (priceType: string, priceDetail?: string): PriceRange => {
  // Si gratuit ou pas de prix
  if (!priceType || priceType.toLowerCase().includes('gratuit')) return 'gratuit';
  
  // Si pas de détail de prix, on suppose payant dans la tranche moyenne
  if (!priceDetail) {
    return priceType.toLowerCase().includes('payant') ? '5-15' : 'gratuit';
  }
  
  // Parser les prix depuis price_detail
  const prices = extractPricesFromText(priceDetail);
  
  if (prices.length === 0) {
    return priceType.toLowerCase().includes('payant') ? '5-15' : 'gratuit';
  }
  
  // Utiliser le prix maximum trouvé pour la classification
  const maxPrice = Math.max(...prices);
  
  if (maxPrice < 5) return 'moins-5';
  if (maxPrice <= 15) return '5-15';
  if (maxPrice <= 30) return '15-30';
  return 'plus-30';
};

// Fonction utilitaire pour extraire les prix depuis un texte HTML/plaintext
const extractPricesFromText = (text: string): number[] => {
  const prices: number[] = [];
  
  // Nettoyer le HTML
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');
  
  // Patterns pour matcher les prix en euros
  const pricePatterns = [
    // "19,90 €", "15.90€", "20 euros"
    /(\d+)[,.]?(\d+)?\s*(?:€|euros?)/gi,
    // "De 5 à 35 euros"
    /de\s+(\d+)\s+à\s+(\d+)\s+euros?/gi,
    // "5 à 35 euros"
    /(\d+)\s+à\s+(\d+)\s+euros?/gi
  ];
  
  for (const pattern of pricePatterns) {
    let match;
    while ((match = pattern.exec(cleanText)) !== null) {
      if (match[1]) {
        // Pour les prix avec décimales : "19,90" -> 19.90
        const price = parseFloat(match[1] + (match[2] ? '.' + match[2] : ''));
        if (!isNaN(price) && price > 0) {
          prices.push(price);
        }
      }
    }
  }
  
  return prices;
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
    queryFn: () => fetchActivites(200), // Augmenté pour plus de diversité
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