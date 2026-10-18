/**
 * Footer : monogramme + copyright, liens de contact (Téléphone, E-mail, LinkedIn, GitHub), bouton « retour en haut ».
 */

import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import Icon from './Icon'

export default function Footer() {
  const { t, lang } = useLanguage()
  const f = t.footer || {}
  const c = profile.contact || {}
  const toTop = lang === 'fr' ? 'Retour en haut' : 'Back to top'

  const links = [
    { icon: 'phone', label: f.phone, href: `tel:${c.phone}` },
    { icon: 'mail', label: f.email, href: `mailto:${c.email}` },
    { icon: 'linkedin', label: f.linkedin, href: c.linkedin, external: true },
    { icon: 'github', label: f.github, href: c.github, external: true },
  ]

  return (
    <footer className="relative border-t border-line">
      <span className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/60 to-transparent" aria-hidden />
      <div className="container-x flex flex-col items-center gap-8 py-10 md:flex-row md:justify-between md:gap-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white" aria-hidden>
            BE
          </span>
          <span className="text-sm text-subtle" dir="ltr">
            {f.copyright ?? '© Baklioun ESSAID'}
          </span>
        </div>

        <nav aria-label={t.nav?.contact || 'Contact'}>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {links.map(({ icon, label, href, external }) => (
              <li key={icon}>
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  <Icon name={icon} className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg"
          aria-label={toTop}
        >
          {toTop}
          <Icon name="arrowUp" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
        </button>
      </div>
    </footer>
  )
}
