# ParcoursParis

**Application web pour faire découvrir Paris aux étudiants arrivants.**

> Projet réalisé dans le cadre du cours de **Management de Projet** (2026)

---

## 🎯 Objectif du projet

Permettre aux étudiants qui arrivent à Paris de :
- Découvrir rapidement les meilleures activités de **la semaine en cours**
- Suivre des **parcours d’activités** déjà construits (itinéraires thématiques)
- Construire facilement leur propre planning

L’application est pensée pour être **simple, belle, et immédiatement utile**.

---

## ✨ Fonctionnalités principales

| Fonctionnalité                  | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| **Cette semaine**              | 15 activités réelles et réalistes pour la semaine du 25-31 mai 2026        |
| **Vue Liste + Carte interactive** | Carte Leaflet avec marqueurs cliquables + mini-photos dans les popups, **synchronisée avec filtres** |
| **Images & Design premium**     | Toutes les cartes ont de belles photos, palette raffinée (style parisien moderne) |
| **Filtres avancés**            | Par jour, catégorie, prix, recherche textuelle                              |
| **5 Parcours thématiques**     | Itinéraires prêts à l’emploi avec timing, budget et conseils               |
| **Planning personnel**         | Ajout d’activités + export du planning                                     |
| **Quiz de recommandation**     | 4 questions → suggestion personnalisée du meilleur parcours                |
| **Favoris**                    | Système de cœur pour sauvegarder tes activités préférées                   |
| **Design premium**             | Cartes avec photos, popups carte enrichis, palette parisienne raffinée     |

---

## 📁 Structure du projet

```
ParcoursParis/
├── index.html              # Application complète (single-file)
├── README.md               # Documentation + idées pour le rendu
├── mockups/                # 6 mockups professionnels pour la présentation
│   ├── 01-hero.jpg
│   ├── 02-activities-grid.jpg
│   ├── 03-interactive-map.jpg
│   ├── 04-parcours.jpg
│   ├── 05-planning.jpg
│   └── 06-mobile.jpg
└── (optionnel) assets/
```

L’application est **entièrement autonome** : tout le code (HTML + Tailwind via CDN + JavaScript + données) est dans un seul fichier.  
Aucune installation, aucun build, aucun backend requis.

---

## 🚀 Lancement rapide

1. Ouvre le fichier `index.html` directement dans ton navigateur (double-clic)
2. Ou utilise Live Server (VS Code) pour un rechargement automatique

C’est tout.

---

## 🗓️ Données de démonstration

Les activités correspondent à la semaine réelle du **25 au 31 mai 2026**.

Catégories présentes :
- Culture & Musées
- Nature & Promenades
- Gastronomie
- Sorties & Soirées
- Sport & Bien-être
- Histoire & Patrimoine
- Art de rue & Créativité

---

## 🛠️ Comment l’améliorer (idées pour le groupe)

### Données en temps réel (très bon point pour le rendu)
L’application peut être connectée facilement à **Paris Open Data**.

**Dataset officiel recommandé :**
- "Que faire à Paris ?" → https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/

Dans le code (voir fonction `showDataSources()` dans l’application), il y a déjà un exemple de fetch.

**Conseil pour le projet :**
- Pour la présentation → garder les données statiques (fiabilité 100%)
- Dans le rapport → montrer le code d’automatisation + expliquer les limites CORS et la solution backend simple

### Court terme (facile)
- [x] Carte interactive Leaflet + photos réelles des lieux
- [x] Système de favoris (cœurs)
- [x] Popups carte enrichis avec photos + actions directes
- [ ] Générer un vrai PDF avec jsPDF au lieu du .txt actuel
- [ ] Ajouter 5-6 nouvelles activités

### Moyen terme
- [ ] Connecter de vraies données (Paris Open Data, Eventbrite étudiant, etc.)
- [ ] Version PWA (installable sur téléphone)
- [ ] Mode sombre
- [ ] Partage de planning (via lien encodé)

### Pour le rendu final
- Captures d’écran de qualité (desktop + mobile)
- Vidéo démo de 60-90 secondes (très efficace en présentation)
- Diagrammes de Gantt / WBS du projet dans le rapport

---

## 📊 Idées pour le rendu Management de Projet

Ce prototype est parfait pour illustrer :

- **Définition du besoin** (étudiants perdus à Paris la première semaine)
- **Cadrage** (MVP vs fonctionnalités futures)
- **Découpage du travail** (activités vs parcours vs planning)
- **Gestion des risques** (délai court → choix d’une solution single-file)
- **Itérations** (on a commencé par les données, puis l’UX, puis les parcours)
- **Valeur utilisateur** (le quiz + les parcours = différenciation claire)

Tu peux facilement présenter :
- Le problème → la solution
- Les arbitrages faits (vitesse de développement vs perfection technique)
- Les 3-4 fonctionnalités qui apportent le plus de valeur

---

## 👥 Équipe

Projet réalisé par un groupe de 2 à 4 étudiants.

**Rôles suggérés :**
- 1 Product Owner (vision + contenu des activités/parcours)
- 1 UX/UI (design + fluidité)
- 1 Tech Lead (développement + intégration)
- 1 Test & Documentation (tests utilisateurs + README + présentation)

---

## 📝 Licence & Remerciements

Prototype pédagogique – données à but démonstratif uniquement.

Merci aux étudiants qui testent et donnent leur avis chaque année.

---

## 🌐 Mise en ligne (Vercel)

Le site est prêt à être déployé gratuitement sur **Vercel** en moins de 3 minutes.

**Guide complet** → Voir le fichier [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md)

**Méthode la plus rapide :**
1. Va sur [https://vercel.com/new](https://vercel.com/new)
2. Glisse-dépose le dossier `ParcoursParis`
3. Vercel déploie automatiquement

URL après déploiement : `https://ton-projet.vercel.app`

---

**Version** : 1.2 (Production-ready)  
**Date** : 28 mai 2026  
**Statut** : MVP fonctionnel et présentable

---

## Questions ?

Contacte l’équipe ou ouvre une issue (si tu passes le projet sur GitHub).

Bonne présentation ! 🎓