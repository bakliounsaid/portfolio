/**
 * Projets : grille bento (cartes larges / étroites en alternance), image en ratio fixe avec zoom au survol,
 * badges techno, flèche « Détails » animée. Toute la carte mène à /project/:id.
 */

import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import { assetUrl } from '../constants'

// Motif 2-1 / 1-2 : la 1re et la 4e carte de chaque groupe de 4 sont larges
const isWide = (i) => i % 4 === 0 || i % 4 === 3

export default function Projects() {
  const { t } = useLanguage()

  return (
    <Section id="projects" index="02" title={t.projects?.title || 'Projets'}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map((p, i) => {
          const pt = t.projects?.[p.id]
          const wide = isWide(i)
          return (
            <Reveal key={p.id} delay={(i % 2) * 100} className={wide ? 'md:col-span-2' : ''}>
              <Card as={Link} to={`/project/${p.id}`} className="group flex h-full flex-col p-2">
                <div className="relative overflow-hidden rounded-[0.9rem] border border-line bg-bg">
                  <img
                    src={assetUrl(p.image)}
                    alt={pt?.title || p.title}
                    loading="lazy"
                    // Captures d'écran (paysage) cadrées en haut, photos (portrait) sur leur sujet
                    onLoad={(e) => {
                      const img = e.currentTarget
                      if (img.naturalHeight > img.naturalWidth) img.style.objectPosition = 'center 62%'
                    }}
                    className={`w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                      wide ? 'aspect-[16/10] md:aspect-[21/10]' : 'aspect-[16/10]'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">{pt?.title || p.title}</h3>
                    <span className="mt-1.5 font-mono text-xs text-subtle" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed text-muted ${wide ? 'line-clamp-3 md:max-w-2xl' : 'line-clamp-2'}`}>
                    {pt?.description || p.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                    {p.technologies?.length > 0 && (
                      <ul className="flex flex-wrap gap-1.5">
                        {p.technologies.map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-fg">
                      {t.projects?.details || 'Détails'}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-transparent group-hover:bg-brand group-hover:text-white">
                        <Icon name="arrowUpRight" className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={2} />
                      </span>
                    </span>
                  </div>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
