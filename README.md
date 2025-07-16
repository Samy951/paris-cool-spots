# 🌡️ Paris Cool Spots

Application web pour trouver des endroits frais à Paris pendant les périodes de chaleur.

## 🎯 Objectif

Aider les parisiens et touristes à découvrir des **îlots de fraîcheur** en période de forte chaleur :
- 🌳 **Parcs ombragés** pour se détendre
- ⛲ **Fontaines** pour se rafraîchir
- 🏊‍♂️ **Piscines** et activités aquatiques
- 📚 **Bibliothèques** et musées climatisés

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd paris-cool-spots

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🔧 Scripts disponibles

```bash
npm start          # Mode développement
npm test           # Lancer les tests
npm run build      # Build de production
```

## 📊 Sources de données

L'application utilise les APIs ouvertes de la Ville de Paris :
- **Espaces verts** : Parcs, jardins et espaces de détente
- **Fontaines à boire** : Points d'eau potable publics
- **Équipements et activités** : Piscines, bibliothèques, musées

## 🛠️ Technologies utilisées

- **React 18** + **TypeScript**
- **TanStack Query** (React Query) pour la gestion des APIs
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Jest** + **React Testing Library** pour les tests

## 📱 Fonctionnalités

✅ **Filtres intelligents** (type, arrondissement, prix, accessibilité)  
✅ **Recherche textuelle** avec debounce  
✅ **Quick filters thématiques** (se rafraîchir, se détendre, activités)  
✅ **Vue grille/liste** adaptative  
✅ **Modal détaillée** pour chaque spot  
✅ **Design responsive** mobile-first  
✅ **Pagination** optimisée  
✅ **Statistiques temps réel**  

## 🎨 Design

- **Couleur principale** : #5f259f
- **Police titres** : Nexa
- **Interface** : Clean et fonctionnelle
- **UX** : Focus sur la simplicité d'usage

## ⚡ Performances

- Bundle optimisé : **66.94 kB** (gzipped)
- Cache intelligent avec React Query
- Debounce sur recherche textuelle
- Pagination pour grandes listes

---

**Projet développé dans le cadre d'un test technique - Quantic Factory** 