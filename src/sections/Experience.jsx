/**
 * Expériences professionnelles, en frise chronologique (l'entrée la plus récente a le point lumineux).
 */

import Section from '../components/Section'
import Timeline from '../components/Timeline'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Experience() {
  const { t } = useLanguage()
  const entries = t.experience?.entries || profile.experience

  return (
    <Section id="experience" index="05" title={t.experience?.title || 'Expérience'}>
      <Timeline
        items={entries}
        isLive={(_, i) => i === 0}
        renderItem={(e, i, live) => (
          <div className="flex gap-4">
            <span
              className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:flex ${
                live ? 'border-transparent bg-brand text-white' : 'border-line bg-bg text-accent'
              }`}
            >
              <Icon name="briefcase" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{e.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {e.company} <span className="text-subtle">· {e.location}</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {(e.points || []).map((p, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      />
    </Section>
  )
}
