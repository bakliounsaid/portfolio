/**
 * Centres d'intérêt – Enseignement & Math, Créer de l'espoir, Animation / présentation / prise de parole.
 */

import Section from '../components/Section'
import Card from '../components/Card'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Interests() {
  const { t } = useLanguage()

  const entries = t.interests?.entries || profile.interests
  return (
    <Section id="interests" title={t.interests?.title || 'Centres d\'intérêt'}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((item, i) => (
          <Card key={i} className="p-4">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{item.label}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
