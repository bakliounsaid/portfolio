/**
 * À propos – résumé en grand format (t.about.summary), libellé mis en avant (t.about.highlight),
 * carte latérale : localisation, e-mail, langues.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function About() {
  const { t, lang } = useLanguage()
  const a = profile.about || {}
  const summary = t.about?.summary || a.summary || profile.hero.tagline
  const highlight = t.about?.highlight || 'Backend Web Developer'
  const highlights = a.highlights || []
  const parts = summary.split(highlight)
  const contact = profile.contact || {}

  const facts = [
    { icon: 'mapPin', label: lang === 'fr' ? 'Localisation' : 'Location', value: contact.location },
    { icon: 'mail', label: t.footer?.email || 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'globe', label: lang === 'fr' ? 'Langues' : 'Languages', value: t.chat?.languages || (profile.languages || []).join(', ') },
  ]

  return (
    <Section id="about" index="01" title={t.about?.title || 'À propos'}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow mb-6 !text-accent">{highlight}</p>
          <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-fg sm:text-2xl md:text-[1.7rem] md:leading-[1.5]">
            {parts.map((part, i) => (
              <span key={i}>
                {part}
                {i < parts.length - 1 && <span className="text-gradient">{highlight}</span>}
              </span>
            ))}
          </p>
          {highlights.length > 0 && (
            <ul className="mt-6 space-y-2 text-muted">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4">
          <Card lift={false} as="aside" className="p-2">
            <dl className="divide-y divide-line">
              {facts.map(({ icon, label, value, href }) => (
                <div key={icon} className="flex items-start gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-accent">
                    <Icon name={icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="eyebrow">{label}</dt>
                    <dd className="mt-1 break-words text-sm font-medium text-fg">
                      {href ? (
                        <a href={href} className="transition-colors hover:text-accent">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
