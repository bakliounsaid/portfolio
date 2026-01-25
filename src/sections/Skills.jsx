/**
 * Compétences : Backend, Bases de données, Outils, IA (LLMs).
 */

import Section from '../components/Section'
import Card from '../components/Card'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Skills() {
  const { t } = useLanguage()
  const s = profile.skills
  const sk = t.skills || {}

  const blocks = [
    { key: 'backend', label: sk.backend || 'Backend', items: sk.backendItems || s?.backend || [] },
    { key: 'databases', label: sk.databases || 'Bases de données', items: sk.databasesItems || s?.databases || [] },
    { key: 'tools', label: sk.tools || 'Outils', items: sk.toolsItems || s?.tools || [] },
    { key: 'ai', label: sk.ai || 'IA & LLMs', items: sk.aiItems || s?.ai || [] },
  ]

  return (
    <Section id="skills" title={t.skills?.title || 'Compétences'}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {blocks.map(({ key, label, items }) => (
          <Card key={key} className="p-4">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{label}</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              {items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
