/**
 * Formation – diplômes et écoles.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Education() {
  const { t } = useLanguage()

  const entries = t.education?.entries || profile.education
  return (
    <Section id="education" title={t.education?.title || 'Formation'}>
      <div className="space-y-4">
        {entries.map((e, i) => (
          <Card key={i} className="p-4">
            <h3 className="font-semibold text-slate-800 dark:text-white">{e.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{e.school} · {e.period} · {e.location}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
