/**
 * Nav : ancres (bold, ligne blanche si sélectionné), dropdown FR/EN, thème. Sans nom dans la barre.
 */

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

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
    { to: '#education', label: nav.education },
    { to: '#experience', label: nav.experience },
    { to: '#interests', label: nav.interests },
    { to: '#contact', label: nav.contact },
  ]

  // Scroll-spy : section active
  useEffect(() => {
    const onScroll = () => {
      const ids = ['hero', 'about', 'projects', 'skills', 'education', 'experience', 'interests', 'contact']
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
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
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

        <div className="flex items-center gap-2">
          {/* CV, Lang, Theme : visibles uniquement sur desktop */}
          <a
            href={profile.contact.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline text-sm font-semibold text-black dark:text-indigo-400 hover:text-slate-800 dark:hover:text-indigo-300 transition-colors"
          >
            {nav.cv}
          </a>

          <div className="relative hidden md:block" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="px-2.5 py-1.5 text-sm font-bold text-black dark:text-slate-300 hover:text-black dark:hover:text-white border border-black dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-colors"
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 py-1 min-w-[4rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg dark:shadow-xl">
                <button
                  type="button"
                  onClick={() => { setLang('fr'); setLangOpen(false) }}
                  className={`block w-full text-left px-3 py-1.5 text-sm font-bold ${lang === 'fr' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/20' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => { setLang('en'); setLangOpen(false) }}
                  className={`block w-full text-left px-3 py-1.5 text-sm font-bold ${lang === 'en' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/20' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  EN
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="hidden md:flex p-1.5 rounded-md border border-black dark:border-slate-600 text-black dark:text-slate-300 hover:border-black hover:text-black dark:hover:border-indigo-400 dark:hover:text-white transition-colors"
            aria-label={dark ? 'Mode clair' : 'Mode sombre'}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          <button
            type="button"
            className="md:hidden p-2 text-black dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            ☰
          </button>
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
          {/* CV, Lang, Mode : dans le menu mobile */}
          <div className="flex flex-col gap-2 pt-3 mt-2 border-t-2 border-slate-200 dark:border-slate-700">
            <a
              href={profile.contact.cv}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="font-bold py-2 text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-200"
            >
              {nav.cv}
            </a>
            <div className="relative" ref={langMobileRef}>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium block mb-1">{lang === 'fr' ? 'Langue' : 'Language'}:</span>
              <button
                type="button"
                onClick={() => setLangMobileOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-black dark:text-slate-300 hover:text-black dark:hover:text-white border border-black dark:border-slate-600 rounded-md bg-white dark:bg-slate-800/50"
              >
                {lang === 'fr' ? 'FR' : 'EN'}
                <span className="text-black dark:text-slate-400">{langMobileOpen ? '▴' : '▾'}</span>
              </button>
              {langMobileOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg dark:shadow-xl z-10">
                  <button
                    type="button"
                    onClick={() => { setLang('fr'); setLangMobileOpen(false) }}
                    className={`block w-full text-left px-3 py-2 text-sm font-bold ${lang === 'fr' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/30' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    FR
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLang('en'); setLangMobileOpen(false) }}
                    className={`block w-full text-left px-3 py-2 text-sm font-bold ${lang === 'en' ? 'text-black dark:text-white bg-slate-100 dark:bg-indigo-600/30' : 'text-black dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    EN
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
              {dark ? '☀️' : '🌙'} {dark ? (lang === 'fr' ? 'Mode clair' : 'Light mode') : (lang === 'fr' ? 'Mode sombre' : 'Dark mode')}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
