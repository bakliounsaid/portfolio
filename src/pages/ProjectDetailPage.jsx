/**
 * Page détail projet : grande(s) image(s), description détaillée (fullDescription), technologies en tags.
 */

import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { t } = useLanguage()
  const project = profile.projects.find((p) => p.id === id)
  const pt = t.projects?.[id]
  const pd = t.projectDetail || {}

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{pd.notFound || 'Projet non trouvé'}</h1>
          <Link to="/#projects" className="text-black dark:text-indigo-500 hover:underline">{pd.back || '← Retour aux projets'}</Link>
        </div>
      </div>
    )
  }

  const images = project.images || [project.image]
  const description = pt?.fullDescription || project.fullDescription || project.description
  const techs = project.technologies || []

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/#projects" className="text-black dark:text-indigo-500 hover:underline mb-6 inline-block">{pd.back || '← Retour aux projets'}</Link>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{pt?.title || project.title}</h1>

        {techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techs.map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-sm rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{description}</p>

        <div className="space-y-4 mb-8">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} ${i + 1}`} className="w-full rounded-xl border border-slate-200 dark:border-slate-700" />
          ))}
        </div>
      </div>
    </div>
  )
}
