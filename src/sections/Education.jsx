/**
 * Formation – diplômes et écoles, en frise chronologique (le plus récent en premier).
 * La formation en cours (current: true) est mise en avant avec un badge.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

const CapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
)

export default function Education() {
  const { t } = useLanguage()

  const entries = t.education?.entries || profile.education
  return (
    <Section id="education" title={t.education?.title || 'Formation'}>
      <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-5 space-y-6">
        {entries.map((e, i) => (
          <li key={i} className="pl-9 md:pl-10 relative">
            <span
              className={`absolute -left-[21px] top-5 flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white dark:ring-black ${
                e.current
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'
              }`}
            >
              <CapIcon />
            </span>
            <Card className={`p-5 ${e.current ? 'border-indigo-300 dark:border-indigo-500/50' : ''}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {e.period}
                </span>
                {e.current && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                    {t.education?.current || 'En cours'}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mt-2">{e.title}</h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {e.school} · {e.location}
              </p>
              {e.detail && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{e.detail}</p>}
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  )
}
