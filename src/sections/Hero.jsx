/**
 * Hero : toutes les demandes regroupées
 * - Photo à gauche, texte (nom, rôle, description) à droite
 * - Fond noir avec effet de lumière (comme la photo)
 * - Typewriter sur la description (lettre par lettre, comme au clavier)
 * - À l’entrée : photo anime depuis la gauche, texte depuis la droite
 * - Au scroll vers le bas : les deux disparaissent avec animation
 */

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import Typewriter from '../components/Typewriter'

const AVATAR = '/images/avatar.png'

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [scrolledPast, setScrolledPast] = useState(false)
  const tagline = t.hero?.tagline || profile.hero.tagline || ''
  const full = tagline
  const typewriterSpeed = 45

  // Entrée / sortie au scroll : photo gauche, texte droite ; disparition en scrollant
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect
        if (entry.isIntersecting) {
          setInView(true)
          setScrolledPast(false)
        } else {
          if (rect.top < 0) setScrolledPast(true)
          setInView(false)
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const heroIn = inView && !scrolledPast
  const heroOut = scrolledPast

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative min-h-[70vh] flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-5 px-4 py-16 md:py-24 bg-white dark:bg-black overflow-hidden ${heroIn ? 'hero-in' : ''} ${heroOut ? 'hero-out' : ''}`}
    >
      {/* Fond avec lumière (effet type photo) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)]" />

      {/* Photo à gauche – entre par la gauche, sort par la gauche ; vibration légère, sans bordure */}
      <div className="hero-photo hero-photo-vibrate relative z-10 flex justify-center md:justify-start md:flex-1 transition-all duration-700 ease-out">
        <img
          src={AVATAR}
          alt={profile.hero.name}
          className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-2xl shadow-indigo-200/30 dark:shadow-indigo-900/20"
        />
      </div>

      {/* Texte à droite – « Hello I'm » (animation depuis le haut), nom, rôle, description, icônes, Contact me. */}
      <div className="hero-text relative z-10 flex flex-col justify-center md:flex-1 md:text-left transition-all duration-700 ease-out">
        <p className="hero-hello-from-top text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-500 dark:text-indigo-400 mb-1">
          {t.hero?.hello || 'Hello, I\'m'}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-2">{profile.hero.name}</h1>
        <p className="text-lg md:text-xl text-indigo-600 dark:text-indigo-300 mb-4">{t.hero?.role || profile.hero.role}</p>
        <p className="text-slate-600 dark:text-slate-300 min-h-[4.5rem] font-mono text-sm md:text-base leading-relaxed mb-4">
          <Typewriter text={tagline} speed={typewriterSpeed} />
        </p>
        {/* LinkedIn & GitHub après la description */}
        <div className="flex items-center gap-4 mb-5">
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        {/* Bouton Contact me – taille moyenne, centré, vibre */}
        <div className="flex justify-center">
          <div className="hero-contact-btn-vibrate">
            <a
              href="#contact"
              className="hero-contact-btn inline-flex items-center justify-center w-fit px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 dark:bg-white/95 dark:hover:bg-white dark:text-slate-800 border border-slate-300/80 dark:border-slate-400/50 hover:border-indigo-400 dark:hover:border-indigo-500/60 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
            >
              {t.hero?.contactMe || 'Contact me'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
