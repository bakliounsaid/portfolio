/**
 * Nav : barre flottante en pilule (flou d'arrière-plan), barre de progression de lecture,
 * scroll-spy, bascule FR/EN, thème clair/sombre, bouton CV, menu mobile plein écran.
 * Hors de l'accueil (/project/:id), les ancres pointent vers « /#section ».
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import Icon from './Icon'

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'education', 'experience', 'contact']

// Ancre native sur l'accueil, lien routeur vers « /#id » ailleurs
function NavLink({ isHome, id, className, children, ...rest }) {
  return isHome ? (
    <a href={`#${id}`} className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link to={`/#${id}`} className={className} {...rest}>
      {children}
    </Link>
  )
}

function LangSwitch({ lang, setLang, className = '' }) {
  return (
    <div
      role="group"
      aria-label={lang === 'fr' ? 'Langue' : 'Language'}
      className={`flex items-center rounded-full border border-line bg-bg/40 p-0.5 font-mono text-[11px] ${className}`}
    >
      {[
        ['fr', 'Français'],
        ['en', 'English'],
      ].map(([code, name]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={name}
          title={name}
          className={`rounded-full px-2.5 py-1.5 transition-colors duration-300 ${
            lang === code ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const { t, lang, setLang, dark, setDark } = useLanguage()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const nav = t.nav || {}

  const links = [
    { id: 'hero', label: nav.home },
    { id: 'about', label: nav.about },
    { id: 'projects', label: nav.projects },
    { id: 'skills', label: nav.skills },
    { id: 'education', label: nav.education },
    { id: 'experience', label: nav.experience },
    { id: 'contact', label: nav.contact },
  ]

  // Scroll-spy + progression de lecture
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let active = isHome ? 'hero' : null
      if (isHome) {
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 140) active = id
        }
      }
      setActiveSection(active)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setScrolled(window.scrollY > 8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [isHome])

  // Menu mobile : bloque le scroll de la page, ferme avec Échap
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Ferme le menu au changement de page
  useEffect(() => setOpen(false), [pathname])

  const themeLabel = dark ? (lang === 'fr' ? 'Mode clair' : 'Light mode') : lang === 'fr' ? 'Mode sombre' : 'Dark mode'

  return (
    <>
      {/* Barre de progression de lecture */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden>
        <div className="h-full origin-left bg-brand" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border pl-2 pr-2 backdrop-blur-xl transition-all duration-500 sm:pl-3 ${
            scrolled || open
              ? 'border-line bg-surface/75 shadow-[0_12px_40px_-20px_rgb(0_0_0/0.45)]'
              : 'border-line/60 bg-surface/40'
          }`}
        >
          {/* Monogramme → accueil */}
          <NavLink
            isHome={isHome}
            id="hero"
            className="group flex items-center gap-2.5 rounded-full pr-2"
            aria-label={`${profile.hero.name} – ${nav.home}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white shadow-[0_6px_20px_-8px_rgb(var(--g2)/0.9)]">
              BE
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-fg sm:block lg:hidden 2xl:block">
              {profile.hero.name}
            </span>
          </NavLink>

          {/* Liens desktop */}
          <nav className="hidden lg:block" aria-label="Navigation">
            <ul className="flex items-center gap-0.5">
              {links.map(({ id, label }) => {
                const active = activeSection === id
                return (
                  <li key={id}>
                    <NavLink
                      isHome={isHome}
                      id={id}
                      aria-current={active ? 'true' : undefined}
                      className={`relative block rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
                        active ? 'bg-fg/[0.07] text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <LangSwitch lang={lang} setLang={setLang} className="hidden lg:flex" />
            <button
              type="button"
              onClick={() => setDark(!dark)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-fg/5 hover:text-fg"
              aria-label={themeLabel}
              title={themeLabel}
            >
              <Icon name={dark ? 'sun' : 'moon'} className="h-[18px] w-[18px]" />
            </button>
            <a
              href={profile.contact.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-9 px-4 text-[13px]"
            >
              <Icon name="file" className="h-4 w-4" />
              {nav.cv}
            </a>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg transition-colors hover:bg-fg/5 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <nav
          className="relative flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-28"
          aria-label="Navigation"
        >
          <ul className="space-y-1">
            {links.map(({ id, label }, i) => {
              const active = activeSection === id
              return (
                <li
                  key={id}
                  className={`transition-all duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
                >
                  <NavLink
                    isHome={isHome}
                    id={id}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'true' : undefined}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="w-6 font-mono text-xs text-subtle">{String(i).padStart(2, '0')}</span>
                    <span
                      className={`font-display text-3xl font-semibold tracking-tight transition-colors sm:text-4xl ${
                        active ? 'text-gradient' : 'text-fg group-hover:text-accent'
                      }`}
                    >
                      {label}
                    </span>
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div
            className={`mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6 transition-all delay-300 duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <LangSwitch lang={lang} setLang={setLang} />
            <button type="button" onClick={() => setDark(!dark)} className="btn-ghost h-10 px-4">
              <Icon name={dark ? 'sun' : 'moon'} className="h-4 w-4" />
              {themeLabel}
            </button>
            <div className="ml-auto flex gap-2">
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
                <Icon name="linkedin" className="h-4 w-4" />
              </a>
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
                <Icon name="github" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
