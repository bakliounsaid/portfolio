/**
 * Formation – diplômes et écoles, en frise chronologique (le plus récent en premier).
 * La formation en cours (current: true) a le point lumineux et un badge.
 */

import Section from '../components/Section'
import Timeline from '../components/Timeline'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Education() {
  const { t } = useLanguage()
  const entries = t.education?.entries || profile.education

  return (
    <Section id="education" index="04" title={t.education?.title || 'Formation'}>
      <Timeline
        items={entries}
        isLive={(e) => !!e.current}
        renderItem={(e, i, live) => (
          <div className="flex gap-4">
            <span
              className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:flex ${
                live ? 'border-transparent bg-brand text-white' : 'border-line bg-bg text-accent'
              }`}
            >
              <Icon name="cap" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{e.title}</h3>
                {e.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    {t.education?.current || 'En cours'}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-accent">
                {e.school} <span className="text-subtle">· {e.location}</span>
              </p>
              {e.detail && <p className="mt-3 text-sm leading-relaxed text-muted">{e.detail}</p>}
            </div>
          </div>
        )}
      />
    </Section>
  )
}
