/**
 * Compétences : Backend, Frontend, Bases de données, Outils, IA (LLMs) – une carte par catégorie.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Skills() {
  const { t } = useLanguage()
  const s = profile.skills
  const sk = t.skills || {}

  const blocks = [
    { key: 'backend', label: sk.backend || 'Backend', items: sk.backendItems || s?.backend || [] },
    { key: 'frontend', label: sk.frontend || 'Frontend', items: sk.frontendItems || s?.frontend || [] },
    { key: 'databases', label: sk.databases || 'Bases de données', items: sk.databasesItems || s?.databases || [] },
    { key: 'tools', label: sk.tools || 'Outils', items: sk.toolsItems || s?.tools || [] },
    { key: 'ai', label: sk.ai || 'IA & LLMs', items: sk.aiItems || s?.ai || [] },
  ]

  return (
    <Section id="skills" index="03" title={t.skills?.title || 'Compétences'}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map(({ key, label, items }, i) => (
          <Reveal key={key} delay={(i % 3) * 90} className={key === 'backend' ? 'lg:row-span-2' : ''}>
            <Card className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-[0_10px_24px_-12px_rgb(var(--g2)/0.9)]">
                  <Icon name={key} className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-subtle" aria-hidden>
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">{label}</h3>
              <ul className={`mt-4 flex flex-wrap gap-2 ${key === 'backend' ? 'lg:flex-col lg:items-start' : ''}`}>
                {items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg/60 px-3 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-fg"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
