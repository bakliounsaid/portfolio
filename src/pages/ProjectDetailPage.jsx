/**
 * Page détail projet : bouton retour, en-tête (titre + technologies), grande image principale,
 * description détaillée (fullDescription), galerie des autres images.
 */

import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import { assetUrl } from '../constants'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

// Le libellé traduit contient déjà « ← » : on le retire pour afficher une vraie icône
const backLabel = (s) => (s || '').replace(/^←\s*/, '')

function BackLink({ label }) {
  return (
    <Link to="/#projects" className="btn-ghost group h-10 px-4">
      <Icon name="arrowLeft" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2} />
      {label}
    </Link>
  )
}

function Frame({ src, alt, eager = false }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-2 shadow-[0_30px_80px_-40px_rgb(var(--g2)/0.6)]">
      <div className="flex items-center gap-1.5 px-2 pb-2 pt-1" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className="w-full rounded-xl border border-line bg-bg" />
    </div>
  )
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { t } = useLanguage()
  const project = profile.projects.find((p) => p.id === id)
  const pt = t.projects?.[id]
  const pd = t.projectDetail || {}
  const back = backLabel(pd.back || '← Retour aux projets')

  if (!project) {
    return (
      <div className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-24 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg">{pd.notFound || 'Projet non trouvé'}</h1>
        <div className="mt-8">
          <BackLink label={back} />
        </div>
      </div>
    )
  }

  const images = project.images || [project.image]
  const [main, ...gallery] = images
  const title = pt?.title || project.title
  const description = pt?.fullDescription || project.fullDescription || project.description
  const techs = project.technologies || []
  const index = profile.projects.indexOf(project) + 1

  return (
    <article className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-32">
      <div className="hero-grid absolute inset-x-0 top-0 -z-10 h-[32rem]" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--g1)/0.2),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div className="container-x">
        <Reveal>
          <BackLink label={back} />
        </Reveal>

        {/* En-tête */}
        <Reveal delay={80} as="header" className="mt-10 max-w-4xl">
          <p className="eyebrow">
            {t.projects?.title || 'Projets'} <span className="text-accent">/ {String(index).padStart(2, '0')}</span>
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{title}</span>
          </h1>
          {techs.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {techs.map((tech) => (
                <li key={tech} className="chip px-3 py-1.5 text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* Image principale */}
        <Reveal delay={160} className="mt-12">
          <Frame src={assetUrl(main)} alt={`${project.title} 1`} eager />
        </Reveal>

        {/* Description */}
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <p className="text-base leading-[1.85] text-muted sm:text-lg">{description}</p>
        </Reveal>

        {/* Galerie */}
        {gallery.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={i * 100}>
                <Frame src={assetUrl(src)} alt={`${project.title} ${i + 2}`} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center border-t border-line pt-10">
          <BackLink label={back} />
        </div>
      </div>
    </article>
  )
}
