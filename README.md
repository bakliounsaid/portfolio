# Portfolio — Baklioun ESSAID

Portfolio personnel développeur web, présentant le parcours, les projets et les compétences de **Baklioun ESSAID** (Ingénieur logiciel & Développeur Web Backend).

---

## Fonctionnalités

- **Sections** : Hero, À propos, Projets, Compétences, Formation, Expérience, Centres d'intérêt, Contact
- **Bilingue** : Français / Anglais (sélecteur dans la barre de navigation)
- **Mode clair / sombre** : bascule dans le header, préférence mémorisée
- **Chat interactif** : bulle flottante pour poser des questions libres sur le parcours, les projets, les compétences, le contact ; réponses basées sur les données du profil, avec relances et suggestions
- **Détail des projets** : page dédiée pour chaque projet (`/project/:id`) avec description complète et technologies
- **Formulaire de contact** : envoi via [Formspree](https://formspree.io) (configurable via variable d'environnement)
- **PWA** : installable comme application de bureau (Chrome, Edge, etc.) et sur mobile ; cache offline via Service Worker
- **Responsive** : adapté mobile, tablette et desktop

---

## Stack technique

| Outil | Usage |
|-------|--------|
| **React 18** | UI |
| **Vite** | Build & dev |
| **React Router** | Routes (accueil, détail projet) |
| **Tailwind CSS** | Styles, mode sombre (class) |
| **Formspree** | Envoi du formulaire Contact (sans backend) |
| **vite-plugin-pwa** | PWA : manifest, Service Worker (Workbox), installation bureau |

---

## Structure du projet

```
src/
├── App.jsx              # Routes, layout (Header, Footer, ChatWidget), sections
├── main.jsx            # Point d’entrée, LanguageProvider, BrowserRouter
├── index.css            # Tailwind + animations (Hero, Chat)
├── constants.js         # Constantes partagées (ex. chemin avatar)
├── components/          # Réutilisables
│   ├── Header.jsx      # Nav, ancres, FR/EN, thème, menu mobile
│   ├── Footer.jsx      # Liens contact (tél, email, LinkedIn, GitHub), copyright
│   ├── ChatWidget.jsx   # Chat type discussion (contexte, relances)
│   ├── Section.jsx     # Conteneur de section avec titre
│   ├── Card.jsx        # Carte (projets, compétences, etc.)
│   └── Typewriter.jsx  # Animation machine à écrire (Hero)
├── context/
│   └── LanguageContext.jsx   # Langue (fr/en) + thème (clair/sombre)
├── data/
│   ├── profile.js      # Données CV (hero, about, contact, skills, experience, projects, education, interests, languages)
│   └── translations.js # Textes FR/EN (nav, sections, chat, footer, etc.)
├── pages/
│   └── ProjectDetailPage.jsx  # Détail d’un projet
└── sections/           # Blocs de la page d’accueil
    ├── Hero.jsx
    ├── About.jsx
    ├── Projects.jsx
    ├── Skills.jsx
    ├── Education.jsx
    ├── Experience.jsx
    ├── Interests.jsx
    └── Contact.jsx
```

---

## Installation et démarrage

```bash
# Cloner (ou déjà dans le dossier du projet)
cd portfolio

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

- **Si `base` = `'/'`** (défaut) : ouvrir **`http://localhost:5173/`**
- **Si `base` = `'/portfolio/'`** (sous-dossier, ex. GitHub Pages) : ouvrir **`http://localhost:5173/portfolio/`**

---

## Build & prévisualisation

```bash
npm run build    # → dist/
npm run preview  # Serve la version buildée en local
```

### PWA — Installation comme application

Après `npm run build` et déploiement (ou `npm run preview` en HTTPS), le site est **installable** :

- **Desktop** : Chrome, Edge → icône « Installer l’application » / « Install app » dans la barre d’adresse ou le menu.
- **Mobile** : « Ajouter à l’écran d’accueil » (iOS) ou « Installer l’application » (Android).

Le Service Worker met en cache les assets pour une utilisation **hors ligne** ; les mises à jour sont appliquées automatiquement (`registerType: 'autoUpdate'`).

---

## Configuration

### Formulaire de contact (Formspree)

1. Créer un formulaire sur [Formspree](https://formspree.io).
2. Copier `.env.example` vers `.env` et renseigner l’identifiant :

```env
VITE_FORMSPREE_ID=votre_id_formspree
```

Sans `VITE_FORMSPREE_ID`, le formulaire utilise une valeur par défaut (à remplacer pour la prod).

### Base URL (sous-dossier)

Dans `vite.config.js`, l’option **`base`** définit le chemin de l’app :

- `base: '/'` → l’app est à la racine (`/`) ; en dev : `http://localhost:5173/`
- `base: '/portfolio/'` → l’app est dans le sous-dossier `/portfolio/` ; en dev : `http://localhost:5173/portfolio/` (utile pour GitHub Pages ou un hébergement en sous-dossier)

`BrowserRouter` utilise `import.meta.env.BASE_URL` pour le `basename`, donc les routes restent correctes. Si vous ne voyez que le header et le footer, vérifier que l’URL (et `base`) correspondent.

### Personnalisation des données

- **Contenu affiché** : modifier `src/data/profile.js` (hero, about, contact, skills, experience, projects, education, interests, languages).
- **Textes et libellés** : `src/data/translations.js` (FR et EN).

---

## Licence

Projet personnel — © Baklioun ESSAID.
