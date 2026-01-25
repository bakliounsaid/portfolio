/**
 * Projets : 2 cartes par ligne, image, description courte, bouton Détails → /project/:id
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
          <Card key={p.id} className="overflow-hidden">
            <img src={assetUrl(p.image)} alt={pt?.title || p.title} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{pt?.title || p.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">{pt?.description || p.description}</p>
              {p.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{tech}</span>
                  ))}
                </div>
              )}
              <div className="flex justify-end mt-2">
                <Link
                  to={`/project/${p.id}`}
                  className="text-black dark:text-indigo-400 hover:text-slate-800 dark:hover:text-indigo-300 hover:underline font-medium text-sm inline-flex items-center gap-1"
                >
                  {t.projects?.details || 'Détails'}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </Card>
          )
        })}
      </div>
    </Section>
  )
}
