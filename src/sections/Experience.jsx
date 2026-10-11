/**
 * Expériences professionnelles, présentées en frise chronologique.
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
      <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-2 space-y-8">
        {entries.map((e, i) => (
          <li key={i} className="pl-6 md:pl-8 relative">
            <span
              className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-4 border-white dark:border-black ${i === 0 ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
              aria-hidden
            />
            <Card className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{e.title}</h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{e.period}</span>
              </div>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">{e.company} · {e.location}</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                {(e.points || []).map((p, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 shrink-0" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  )
}
