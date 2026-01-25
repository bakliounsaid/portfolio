/**
 * Contexte de langue (FR par défaut) et thème.
 */

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('portfolio-lang') || 'fr'
    } catch {
      return 'fr'
    }
  })
  const [dark, setDark] = useState(() => {
    try {
      const v = localStorage.getItem('portfolio-dark')
      if (v !== null) return v === 'true'
      return true // par défaut : mode sombre
    } catch {
      return true
    }
  })

  useEffect(() => {
    try { localStorage.setItem('portfolio-lang', lang) } catch {}
  }, [lang])

  useEffect(() => {
    try { localStorage.setItem('portfolio-dark', String(dark)) } catch {}
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const t = translations[lang] || translations.fr

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dark, setDark }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
