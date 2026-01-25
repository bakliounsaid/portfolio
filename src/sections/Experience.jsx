/**
 * Expériences professionnelles.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Experience() {
  const { t } = useLanguage()

  const entries = t.experience?.entries || profile.experience
  return (
    <Section id="experience" title={t.experience?.title || 'Expérience'}>
      <div className="space-y-6">
        {entries.map((e, i) => (
          <Card key={i} className="p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-semibold text-slate-800 dark:text-white">{e.title}</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">{e.period} · {e.location}</span>
            </div>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{e.company}</p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
              {(e.points || []).map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
