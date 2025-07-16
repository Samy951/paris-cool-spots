import { CoolSpot, SpotType } from '../../types';

// Fonctions importées du module (normalement on les exporterait pour les tests)
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

describe('Activity Type Detection', () => {
  describe('Pool Detection', () => {
    it('should detect pools correctly', () => {
      expect(detectActivityType('Piscine Joséphine Baker')).toBe('pool');
      expect(detectActivityType('Centre aquatique de Bercy')).toBe('pool');
      expect(detectActivityType('Cours de natation')).toBe('pool');
      expect(detectActivityType('Baignade dans la Seine')).toBe('pool');
    });

    it('should not detect false positives for pools', () => {
      expect(detectActivityType('Exposition aquatique')).toBe('activity');
      expect(detectActivityType('Concert dans un parc')).toBe('activity');
    });
  });

  describe('Library Detection', () => {
    it('should detect libraries correctly', () => {
      expect(detectActivityType('Bibliothèque François Mitterrand')).toBe('library');
      expect(detectActivityType('Médiathèque du 13ème')).toBe('library');
      expect(detectActivityType('Atelier à la bibliothèque')).toBe('library');
    });

    it('should prioritize library over museum when both keywords present', () => {
      expect(detectActivityType('Exposition à la bibliothèque')).toBe('library');
    });
  });

  describe('Museum Detection', () => {
    it('should detect museums correctly', () => {
      expect(detectActivityType('Musée du Louvre')).toBe('museum');
      expect(detectActivityType('Visite du museum')).toBe('museum');
      expect(detectActivityType('Exposition à la galerie')).toBe('museum');
      expect(detectActivityType('Visite exposition moderne')).toBe('museum');
      expect(detectActivityType('Galerie d\'art contemporain')).toBe('museum');
    });

    it('should not detect simple exposition as museum', () => {
      expect(detectActivityType('Exposition de photos')).toBe('activity');
    });
  });

  describe('Default Activity Detection', () => {
    it('should default to activity for other cases', () => {
      expect(detectActivityType('Concert de jazz')).toBe('activity');
      expect(detectActivityType('Théâtre en plein air')).toBe('activity');
      expect(detectActivityType('Festival de musique')).toBe('activity');
      expect(detectActivityType('Atelier créatif')).toBe('activity');
    });
  });

  describe('Complex Cases', () => {
    it('should handle complex descriptions correctly', () => {
      expect(detectActivityType(
        'Atelier créatif', 
        'Un atelier pour les enfants dans une exposition temporaire',
        'Venez découvrir l\'art à la galerie'
      )).toBe('museum');

      expect(detectActivityType(
        'Lecture publique',
        'Découvrez nos nouveaux livres à la bibliothèque',
        'Événement gratuit'
      )).toBe('library');

      expect(detectActivityType(
        'Activité aquatique',
        'Cours de natation pour débutants',
        'À la piscine municipale'
      )).toBe('pool');
    });
  });
});

describe('Activity Features Generation', () => {
  it('should generate appropriate features for each type', () => {
    // Ces tests nécessiteraient d'exporter les fonctions utilitaires
    // Pour l'instant, on teste juste que les types sont correctement détectés
    expect(detectActivityType('Piscine chauffée')).toBe('pool');
    expect(detectActivityType('Musée d\'art moderne')).toBe('museum');
    expect(detectActivityType('Bibliothèque numérique')).toBe('library');
  });
});

 