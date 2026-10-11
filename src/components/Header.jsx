/**
 * Nav : ancres (bold, ligne blanche si sélectionné), dropdown FR/EN, thème. Sans nom dans la barre.
 */

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

// Composants SVG pour les drapeaux
const FlagFR = () => (
  <svg className="w-5 h-4" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="6.67" height="15" fill="#002654"/>
    <rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/>
    <rect x="13.33" width="6.67" height="15" fill="#ED2939"/>
  </svg>
)

const FlagGB = () => (
  <svg className="w-5 h-4" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="20" height="15" fill="#012169"/>
    <path d="M0 0L20 15M20 0L0 15" stroke="white" strokeWidth="2"/>
    <path d="M0 0L20 15M20 0L0 15" stroke="#C8102E" strokeWidth="1.33"/>
    <path d="M10 0V15M0 7.5H20" stroke="white" strokeWidth="3.33"/>
    <path d="M10 0V15M0 7.5H20" stroke="#C8102E" strokeWidth="2"/>
  </svg>
)

export default function Header() {
  const { t, lang, setLang, dark, setDark } = useLanguage()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [langMobileOpen, setLangMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const langRef = useRef(null)
  const langMobileRef = useRef(null)
  const nav = t.nav || {}

  const links = [
    { to: '#hero', label: nav.home },
    { to: '#about', label: nav.about },
    { to: '#projects', label: nav.projects },
    { to: '#skills', label: nav.skills },
    { to: '#contact', label: nav.contact },
  ]

  // Scroll-spy : section active
  useEffect(() => {
    const onScroll = () => {
      const ids = ['hero', 'about', 'projects', 'skills', 'contact']
      let active = 'hero'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= 140) active = id
      }
      setActiveSection(active)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer le dropdown langue (desktop) au clic extérieur
  useEffect(() => {
    if (!langOpen) return
    const fn = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('click', fn)
    return () => document.removeEventListener('click', fn)
  }, [langOpen])

  // Fermer le dropdown langue (mobile) au clic extérieur
  useEffect(() => {
    if (!langMobileOpen) return
    const fn = (e) => {
      if (langMobileRef.current && !langMobileRef.current.contains(e.target)) setLangMobileOpen(false)
    }
    document.addEventListener('click', fn)
    return () => document.removeEventListener('click', fn)
  }, [langMobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/70 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14 md:h-16">
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => {
            const id = to.slice(1)
            const active = activeSection === id
            return (
              <a
                key={to}
                href={to}
                className={`px-2 py-1.5 text-sm font-bold relative after:absolute after:left-2 after:right-2 after:bottom-0 after:h-0.5 after:transition-transform
                  ${active
                    ? 'text-black dark:text-white after:bg-black dark:after:bg-white after:scale-x-100'
                    : 'text-black dark:text-slate-300 after:bg-black dark:after:bg-white after:scale-x-0 hover:text-black dark:hover:text-white hover:after:scale-x-100'
                  }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* Mobile: menu à gauche, CV à droite | Desktop: tout à droite */}
        <div className="flex items-center gap-2 flex-1 md:flex-initial justify-between md:justify-end">
          {/* Mobile : bouton menu à gauche */}
          <button
            type="button"
            className="md:hidden p-2 text-black dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {/* CV + Lang + Theme : à droite (CV seul visible à droite sur mobile) */}
          <div className="flex items-center gap-2">
            <a
              href={profile.contact.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-black dark:text-indigo-400 hover:text-slate-800 dark:hover:text-indigo-300 transition-colors"
            >
              {nav.cv}
            </a>

          {/* Lang avec drapeaux : desktop */}
          <div className="relative hidden md:block" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-bold text-black dark:text-slate-300 hover:text-black dark:hover:text-white border border-black dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-colors"
              aria-label={lang === 'fr' ? 'Français' : 'English'}
            >
              {lang === 'fr' ? <FlagFR /> : <FlagGB />}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 py-1 min-w-[5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg dark:shadow-xl">
                <button
                  type="button"
                  onClick={() => { setLang('fr'); setLangOpen(false) }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm font-bold ${lang === 'fr' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/20' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  <FlagFR />
                </button>
                <button
                  type="button"
                  onClick={() => { setLang('en'); setLangOpen(false) }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm font-bold ${lang === 'en' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/20' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  <FlagGB />
                </button>
              </div>
            )}
          </div>

          {/* Thème : icône soleil / lune */}
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="hidden md:flex p-1.5 rounded-md border border-black dark:border-slate-600 text-black dark:text-slate-300 hover:border-black hover:text-black dark:hover:border-indigo-400 dark:hover:text-white transition-colors"
            aria-label={dark ? 'Mode clair' : 'Mode sombre'}
          >
            {dark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 flex flex-col gap-1">
          {links.map(({ to, label }) => {
            const id = to.slice(1)
            const active = activeSection === id
            return (
              <a
                key={to}
                href={to}
                onClick={() => setOpen(false)}
                className={`font-bold py-2 border-b border-slate-200 dark:border-slate-700/50 ${active ? 'text-black dark:text-white' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white'}`}
              >
                {label}
              </a>
            )
          })}
          {/* Lang, Mode : dans le menu mobile */}
          <div className="flex flex-col gap-2 pt-3 mt-2 border-t-2 border-slate-200 dark:border-slate-700">
            <div className="relative" ref={langMobileRef}>
              <button
                type="button"
                onClick={() => setLangMobileOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-sm font-bold text-black dark:text-slate-300 hover:text-black dark:hover:text-white border border-black dark:border-slate-600 rounded-md bg-white dark:bg-slate-800/50"
              >
                <div className="flex items-center gap-2">
                  {lang === 'fr' ? <FlagFR /> : <FlagGB />}
                  <span className="text-xs text-slate-500 dark:text-slate-400">{lang === 'fr' ? 'Langue' : 'Language'}</span>
                </div>
                <span className="text-black dark:text-slate-400 text-xs">{langMobileOpen ? '▴' : '▾'}</span>
              </button>
              {langMobileOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg dark:shadow-xl z-10">
                  <button
                    type="button"
                    onClick={() => { setLang('fr'); setLangMobileOpen(false) }}
                    className={`flex items-center justify-center gap-1.5 w-full px-2 py-1.5 text-sm ${lang === 'fr' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/30' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <FlagFR />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLang('en'); setLangMobileOpen(false) }}
                    className={`flex items-center justify-center gap-1.5 w-full px-2 py-1.5 text-sm ${lang === 'en' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/30' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <FlagGB />
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => { setDark(!dark) }}
              className="flex items-center gap-2 font-bold py-2 text-black dark:text-slate-300 hover:text-black dark:hover:text-white w-fit"
              aria-label={dark ? 'Mode clair' : 'Mode sombre'}
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
              {dark ? (lang === 'fr' ? 'Mode clair' : 'Light mode') : (lang === 'fr' ? 'Mode sombre' : 'Dark mode')}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
