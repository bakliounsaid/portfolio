/**
 * Centres d'intérêt – Enseignement & Math, Créer de l'espoir, Animation / présentation / prise de parole.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

// Icône par position (même ordre dans les deux langues)
const ICONS = ['sigma', 'heart', 'presentation']

export default function Interests() {
  const { t } = useLanguage()
  const entries = t.interests?.entries || profile.interests

  return (
    <Section id="interests" index="06" title={t.interests?.title || "Centres d'intérêt"}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((item, i) => (
          <Reveal key={i} delay={i * 90}>
            <Card className="h-full p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg text-accent">
                <Icon name={ICONS[i % ICONS.length]} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-fg">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
