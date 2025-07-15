const API_BASE_URL = 'https://opendata.paris.fr/api/records/1.0/search/';

export interface ParisAPIResponse<T = any> {
  nhits: number;
  parameters: {
    dataset: string;
    rows: number;
    start: number;
    format: string;
    timezone: string;
  };
  records: Array<{
    datasetid: string;
    recordid: string;
    fields: T;
    geometry?: {
      type: string;
      coordinates: number[];
    };
    record_timestamp: string;
  }>;
}

// Types pour les données brutes des APIs
export interface RawEspaceVert {
  nom_ev: string;
  type_ev: string;
  categorie: string;
  adresse_codepostal: string;
  adresse_libellevoie: string;
  adresse_numero?: number;
  annee_ouverture: string;
  geom_x_y: [number, number];
  presence_cloture: string;
  competence: string;
}

export interface RawFontaine {
  gid: string;
  geo_point_2d: [number, number];
  voie: string;
  dispo: string;
  type_objet: string;
  commune: string;
  modele: string;
}

export interface RawActivite {
  title: string;
  description: string;
  lead_text: string;
  address_city: string;
  address_street: string;
  address_zipcode: string;
  price_type: string;
  price_detail: string;
  audience: string;
  lat_lon: [number, number];
  access_link?: string;
  url: string;
}

// Fonctions pour récupérer les données des APIs
export const fetchEspacesVerts = async (limit = 50): Promise<ParisAPIResponse<RawEspaceVert>> => {
  const response = await fetch(`${API_BASE_URL}?dataset=espaces_verts&rows=${limit}`);
  if (!response.ok) {
    throw new Error(`Erreur API espaces verts: ${response.status}`);
  }
  return response.json();
};

export const fetchFontaines = async (limit = 50): Promise<ParisAPIResponse<RawFontaine>> => {
  const response = await fetch(`${API_BASE_URL}?dataset=fontaines-a-boire&rows=${limit}`);
  if (!response.ok) {
    throw new Error(`Erreur API fontaines: ${response.status}`);
  }
  return response.json();
};

export const fetchActivites = async (limit = 50): Promise<ParisAPIResponse<RawActivite>> => {
  const response = await fetch(`${API_BASE_URL}?dataset=que-faire-a-paris-&rows=${limit}`);
  if (!response.ok) {
    throw new Error(`Erreur API activités: ${response.status}`);
  }
  return response.json();
}; 