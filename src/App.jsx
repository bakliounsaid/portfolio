/**
 * App : Header, Routes (accueil + /project/:id), Footer, ChatWidget.
 * Sections : Hero → About → Projects → Skills → Education → Experience → Interests → Contact.
 */

import { Routes, Route } from 'react-router-dom'

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

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-800 dark:text-slate-200">
      <Header />

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

      <Footer />
      <ChatWidget />
    </div>
  )
}
