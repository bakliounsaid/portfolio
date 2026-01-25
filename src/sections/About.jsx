/**
 * À propos – résumé avec le terme mis en avant (« Backend Web Developer » / « Développeur Web Backend ») en gras et coloré.
 * Utilise t.about.summary et t.about.highlight pour FR/EN.
 */

import Section from '../components/Section'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function About() {
  const { t } = useLanguage()
  const a = profile.about || {}
  const summary = t.about?.summary || a.summary || profile.hero.tagline
  const highlight = t.about?.highlight || 'Backend Web Developer'
  const highlights = a.highlights || []
  const parts = summary.split(highlight)

  return (
    <Section id="about" title={t.about?.title || 'À propos'}>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{highlight}</span>
            )}
          </span>
        ))}
      </p>
      {highlights.length > 0 && (
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
          {highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
    </Section>
  )
}
