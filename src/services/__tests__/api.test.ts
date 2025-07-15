import { fetchEspacesVerts, fetchFontaines, fetchActivites } from '../api';

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Services', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchEspacesVerts', () => {
    it('should fetch green spaces data successfully', async () => {
      const mockResponse = {
        nhits: 1,
        records: [
          {
            datasetid: 'espaces_verts',
            recordid: 'test-id',
            fields: {
              nom_ev: 'Test Park',
              type_ev: 'Jardin',
              categorie: 'Parc',
              adresse_codepostal: '75001',
              geom_x_y: [48.8566, 2.3522]
            }
          }
        ]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchEspacesVerts(50);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://opendata.paris.fr/api/records/1.0/search/?dataset=espaces_verts&rows=50'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(fetchEspacesVerts()).rejects.toThrow('Erreur API espaces verts: 500');
    });
  });

  describe('fetchFontaines', () => {
    it('should fetch fountains data successfully', async () => {
      const mockResponse = {
        nhits: 1,
        records: [
          {
            datasetid: 'fontaines-a-boire',
            recordid: 'test-id',
            fields: {
              gid: '123',
              geo_point_2d: [48.8566, 2.3522],
              voie: 'RUE DE TEST',
              dispo: 'OUI'
            }
          }
        ]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchFontaines(100);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://opendata.paris.fr/api/records/1.0/search/?dataset=fontaines-a-boire&rows=100'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchActivites', () => {
    it('should fetch activities data successfully', async () => {
      const mockResponse = {
        nhits: 1,
        records: [
          {
            datasetid: 'que-faire-a-paris-',
            recordid: 'test-id',
            fields: {
              title: 'Test Event',
              description: 'Test Description',
              address_zipcode: '75001',
              price_type: 'gratuit',
              lat_lon: [48.8566, 2.3522]
            }
          }
        ]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchActivites(25);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=25'
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 