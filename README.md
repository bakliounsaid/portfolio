# Portfolio — Baklioun ESSAID

Personal developer portfolio presenting the background, projects and skills of **Baklioun ESSAID** (Software Engineer & Backend Web Developer).

---

## Features

- **Sections:** Hero, About, Projects, Skills, Education, Experience, Interests, Contact
- **Bilingual:** French / English (switcher in the navigation bar)
- **Light / dark mode:** toggle in the header, preference remembered
- **Interactive chat:** floating widget to ask free-form questions about background, projects, skills and contact info; answers based on profile data, with follow-up prompts and suggestions
- **Project detail pages:** dedicated page for each project (`/project/:id`) with full description and technologies used
- **Contact form:** submissions handled via [Formspree](https://formspree.io) (configurable through an environment variable)
- **PWA:** installable as a desktop app (Chrome, Edge, etc.) and on mobile; offline caching via Service Worker
- **Responsive:** adapted for mobile, tablet and desktop

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI |
| **Vite** | Build & dev server |
| **React Router** | Routing (home, project detail) |
| **Tailwind CSS** | Styling, dark mode (class-based) |
| **Formspree** | Contact form submission (backend-free) |
| **vite-plugin-pwa** | PWA: manifest, Service Worker (Workbox), desktop install |

---

## Getting Started

```bash
# Clone (or you're already in the project folder)
cd portfolio

# Install dependencies
npm install

# Run in development
npm run dev
```

- **If `base` = `'/'`** (default): open **`http://localhost:5173/`**
- **If `base` = `'/portfolio/'`** (subfolder, e.g. GitHub Pages): open **`http://localhost:5173/portfolio/`**

---

## Build & Preview

```bash
npm run build    # → dist/
npm run preview  # Serves the built version locally
```

### PWA — Installing as an app

After `npm run build` and deployment (or `npm run preview` over HTTPS), the site is **installable**:

- **Desktop:** Chrome, Edge → "Install app" icon in the address bar or menu
- **Mobile:** "Add to Home Screen" (iOS) or "Install app" (Android)

The Service Worker caches assets for **offline use**; updates are applied automatically (`registerType: 'autoUpdate'`).

---

## Configuration

### Contact form (Formspree)

1. Create a form on [Formspree](https://formspree.io)
2. Copy `.env.example` to `.env` and set the form ID:

```env
VITE_FORMSPREE_ID=your_formspree_id
```

Without `VITE_FORMSPREE_ID`, the form falls back to a default value (replace before deploying to production).

### Base URL (subfolder deployment)

In `vite.config.js`, the **`base`** option defines the app's path:

- `base: '/'` → the app is served at the root (`/`); in dev: `http://localhost:5173/`
- `base: '/portfolio/'` → the app is served under `/portfolio/`; in dev: `http://localhost:5173/portfolio/` (useful for GitHub Pages or subfolder hosting)

`BrowserRouter` uses `import.meta.env.BASE_URL` as its `basename`, so routes stay correct. If you only see the header and footer, check that the URL (and `base`) match.

### Customizing data

- **Displayed content:** edit `src/data/profile.js` (hero, about, contact, skills, experience, projects, education, interests, languages)
- **Textes et libellés** : `src/data/translations.js` (FR et EN).

---

## Licence

Projet personnel — © Baklioun ESSAID.
