/**
 * App : Header, Routes (accueil + /project/:id), Footer, ChatWidget.
 * Sections : Hero → About → Projects → Skills → Education → Experience → Interests → Contact.
 */

import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useLanguage } from './context/LanguageContext'

import Header from './components/Header'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Interests from './sections/Interests'
import Contact from './sections/Contact'

import ProjectDetailPage from './pages/ProjectDetailPage'
import profile from './data/profile'

// Au changement de page : haut de page, ou section ciblée (« /#projects »).
// Les ancres sur la même page sont laissées au navigateur (défilement doux).
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  const prevPath = useRef(null)
  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}

export default function App() {
  const { lang } = useLanguage()
  useScrollOnNavigate()

  // Langue du document pour les lecteurs d'écran
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[70] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-fg focus:shadow-lg"
      >
        {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>

      <Header />

      <main id="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About data={profile} />
                <Projects data={profile.projects} />
                <Skills data={profile.skills} />
                <Education data={profile.education} />
                <Experience data={profile.experience} />
                <Interests data={profile.interests} />
                <Contact data={profile.contact} />
              </>
            }
          />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
