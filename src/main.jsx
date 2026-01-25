import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import { LanguageProvider } from './context/LanguageContext'
import App from './App'
import './index.css'

// Enregistrement du Service Worker pour la PWA (installation bureau, offline)
registerSW()

// basename : si l'app est servie dans un sous-dossier (ex. /portfolio/), doit correspondre à vite base.
// import.meta.env.BASE_URL = '/' en dev avec base: '/' ; = '/portfolio/' si base: '/portfolio/'
const basename = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)
