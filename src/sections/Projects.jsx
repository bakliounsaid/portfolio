/**
 * Projets : 2 cartes par ligne, image, description courte ; toute la carte mène à /project/:id
 */

import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Card from '../components/Card'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import { assetUrl } from '../constants'

export default function Projects() {
  const { t } = useLanguage()

  return (
    <Section id="projects" title={t.projects?.title || 'Projets'}>
      <div className="grid md:grid-cols-2 gap-6">
        {profile.projects.map((p) => {
          const pt = t.projects?.[p.id]
          return (
            <Link key={p.id} to={`/project/${p.id}`} className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={assetUrl(p.image)}
                    alt={pt?.title || p.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{pt?.title || p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{pt?.description || p.description}</p>
                  {p.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">{tech}</span>
                      ))}
                    </div>
                  )}
                  <span className="mt-auto self-end text-sm font-semibold text-slate-900 dark:text-indigo-400 inline-flex items-center gap-1">
                    {t.projects?.details || 'Détails'}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
