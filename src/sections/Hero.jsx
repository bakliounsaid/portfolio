/**
 * Hero : grille fine en fond, nom en dégradé, rôle, tagline en Typewriter,
 * photo avec anneau en dégradé et halo, CTA (Contact + CV) + LinkedIn / GitHub,
 * bandeau défilant des technologies (profile.skills).
 */

import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import Typewriter from '../components/Typewriter'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { AVATAR } from '../constants'

// Technologies du bandeau : libellés courts uniquement (les intitulés longs restent dans Compétences)
const TECHS = Object.values(profile.skills || {})
  .flat()
  .filter((s) => s.length <= 14)

export default function Hero() {
  const { t } = useLanguage()
  const tagline = t.hero?.tagline || profile.hero.tagline || ''

  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Fond : grille fine + halos */}
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--g1)/0.22),transparent_65%)] blur-2xl lg:left-[30%]"
        aria-hidden
      />
      <div
        className="absolute right-[-10rem] top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(var(--g3)/0.14),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div className="container-x grid flex-1 items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8">
        {/* Texte */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" aria-hidden />
              {t.hero?.hello || "Hello, I'm"}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{profile.hero.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 flex items-center gap-3 font-display text-xl font-medium text-fg sm:text-2xl">
              {t.hero?.role || profile.hero.role}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <Typewriter text={tagline} speed={35} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg" />
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary h-12 px-6">
              {t.hero?.contactMe || 'Contact me'}
              <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
            </a>
            <a href={profile.contact.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost h-12 px-6">
              <Icon name="file" className="h-4 w-4" />
              {t.nav?.cv || 'CV'}
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
            <div className="flex gap-3">
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn h-12 w-12" aria-label="LinkedIn">
                <Icon name="linkedin" className="h-[18px] w-[18px]" />
              </a>
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="icon-btn h-12 w-12" aria-label="GitHub">
                <Icon name="github" className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Photo */}
        <Reveal delay={120} className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="relative w-52 sm:w-64 lg:w-[22rem]">
            <div className="absolute -inset-10 rounded-full bg-brand opacity-25 blur-3xl" aria-hidden />
            <div className="absolute -inset-5 rounded-full border border-dashed border-line" aria-hidden />
            <div className="relative aspect-square rounded-full bg-brand p-[3px] shadow-[0_30px_80px_-30px_rgb(var(--g2)/0.8)]">
              <img
                src={AVATAR}
                alt={profile.hero.name}
                width="352"
                height="352"
                className="h-full w-full rounded-full border-4 border-bg bg-surface object-cover"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-muted shadow-lg backdrop-blur lg:left-6 lg:translate-x-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              <Icon name="mapPin" className="h-3.5 w-3.5" />
              {profile.contact.location}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Bandeau défilant des technologies */}
      <div className="border-y border-line bg-surface/40 py-4 backdrop-blur-sm">
        <div className="marquee overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center gap-10 pr-10"
                aria-label={copy === 0 ? t.skills?.title : undefined}
                aria-hidden={copy === 1 || undefined}
              >
                {TECHS.map((tech) => (
                  <li key={tech} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-subtle">
                    <span>{tech}</span>
                    <span className="h-1 w-1 rounded-full bg-brand" aria-hidden />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
