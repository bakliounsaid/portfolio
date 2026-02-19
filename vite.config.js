import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/avatar.png'],
      manifest: {
        name: 'Baklioun ESSAID – Développeur Web',
        short_name: 'Baklioun ESSAID',
        description: 'Portfolio – Développeur Web avec vision mathématique',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'fr',
        // Ta photo (avatar) comme icône PWA pour l’installation bureau et mobile
        icons: [
          { src: 'images/avatar.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'images/avatar.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'images/avatar.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  // base: '/'           → app à http://localhost:5173/
  // base: '/portfolio/'  → app à http://localhost:5173/portfolio/ (sous-dossier, ex. GitHub Pages)
  base: '/',
})
