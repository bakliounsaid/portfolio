/**
 * Contact – deux colonnes sur desktop : moyens de contact directs à gauche, formulaire à droite.
 * Formulaire (email, subject, message) envoyé via Formspree.
 * Validation des champs, erreurs affichées, snackbar de succès ou d'erreur.
 * VITE_FORMSPREE_ID dans .env override la valeur par défaut.
 */

import { useState, useEffect } from 'react'
import Section from '../components/Section'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xpqdzvaw'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// « https://www.linkedin.com/in/x » → « linkedin.com/in/x »
const strip = (url) => (url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
      <Icon name="alert" className="h-4 w-4 shrink-0" />
      {message}
    </p>
  )
}

export default function Contact({ data }) {
  const { t } = useLanguage()
  const labels = t.contact || {}
  const f = t.footer || {}
  const c = data || profile.contact || {}
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(null) // 'success' | 'error'
  const [submitError, setSubmitError] = useState('')

  // Fermer le snackbar après 4 s
  useEffect(() => {
    if (!snackbar) return
    const timer = setTimeout(() => setSnackbar(null), 4000)
    return () => clearTimeout(timer)
  }, [snackbar])

  const validate = () => {
    const e = {}
    const em = (email || '').trim()
    if (!em) e.email = labels.errEmailRequired || 'Email is required.'
    else if (!emailRegex.test(em)) e.email = labels.errEmailInvalid || 'Invalid email.'
    if (!(subject || '').trim()) e.subject = labels.errSubjectRequired || 'Subject is required.'
    if (!(message || '').trim()) e.message = labels.errMessageRequired || 'Message is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setSubmitError('')
    setSnackbar(null)
    if (!validate()) return

    if (!FORMSPREE_ID) {
      setSubmitError(labels.errConfig || 'Form not configured.')
      setSnackbar('error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _replyto: email.trim(),
        }),
      })
      if (res.ok) {
        setEmail('')
        setSubject('')
        setMessage('')
        setErrors({})
        setSnackbar('success')
      } else {
        const json = await res.json().catch(() => ({}))
        setSubmitError(json?.error || labels.errSend || 'Error sending.')
        setSnackbar('error')
      }
    } catch {
      setSubmitError(labels.errSend || 'Error sending.')
      setSnackbar('error')
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'block w-full rounded-xl border bg-bg/60 px-4 py-3 text-base text-fg placeholder:text-subtle/80 transition-[border-color,box-shadow,background-color] duration-200 focus:bg-bg focus:outline-none focus:ring-4 disabled:opacity-60 sm:text-sm'
  const inputError = 'border-red-500/70 focus:border-red-500 focus:ring-red-500/15'
  const inputOk = 'border-line hover:border-subtle/50 focus:border-accent focus:ring-accent/15'

  // Attributs ARIA liant chaque champ à son message d'erreur
  const fieldProps = (name) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const channels = [
    { icon: 'mail', label: f.email || 'E-mail', value: c.email, href: `mailto:${c.email}` },
    { icon: 'phone', label: f.phone || 'Téléphone', value: c.phone, href: `tel:${c.phone}` },
    { icon: 'linkedin', label: f.linkedin || 'LinkedIn', value: strip(c.linkedin), href: c.linkedin, external: true },
    { icon: 'github', label: f.github || 'GitHub', value: strip(c.github), href: c.github, external: true },
  ]

  return (
    <Section id="contact" index="07" title={labels.title || 'Contact'}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Moyens de contact directs */}
        <Reveal className="lg:col-span-5">
          <p className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            <span className="text-gradient">{t.hero?.contactMe || 'Contact me'}</span>
          </p>
          <ul className="mt-8 space-y-3">
            {channels.map(({ icon, label, value, href, external }) => (
              <li key={icon}>
                <Card
                  as="a"
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-4 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-accent transition-colors duration-300 group-hover:border-transparent group-hover:bg-brand group-hover:text-white">
                    <Icon name={icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block">{label}</span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-fg">{value}</span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    strokeWidth={2}
                  />
                </Card>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Formulaire */}
        <Reveal delay={120} className="lg:col-span-7">
          <Card lift={false} as="form" onSubmit={handleSubmit} noValidate className="space-y-5 p-5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
                  {labels.email ?? 'Your email'}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((err) => ({ ...err, email: undefined })) }}
                  placeholder={labels.placeholderEmail ?? 'your@email.com'}
                  className={`${inputBase} ${errors.email ? inputError : inputOk}`}
                  disabled={loading}
                  {...fieldProps('email')}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-fg">
                  {labels.subject || 'Subject'}
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); setErrors((err) => ({ ...err, subject: undefined })) }}
                  placeholder={labels.placeholderSubject || 'Your subject'}
                  className={`${inputBase} ${errors.subject ? inputError : inputOk}`}
                  disabled={loading}
                  {...fieldProps('subject')}
                />
                <FieldError id="subject-error" message={errors.subject} />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
                {labels.message || 'Message'}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => { setMessage(e.target.value); setErrors((err) => ({ ...err, message: undefined })) }}
                placeholder={labels.placeholderMessage || 'Your message'}
                rows={6}
                className={`${inputBase} min-h-[9rem] resize-y ${errors.message ? inputError : inputOk}`}
                disabled={loading}
                {...fieldProps('message')}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary h-12 w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                  {labels.sending || 'Sending...'}
                </>
              ) : (
                <>
                  {labels.send || 'Send'}
                  <Icon name="send" className="h-4 w-4" strokeWidth={1.75} />
                </>
              )}
            </button>
          </Card>
        </Reveal>
      </div>

      {/* Snackbar (au-dessus du bouton de chat sur mobile) */}
      {snackbar && (
        <div
          className={`fixed bottom-24 left-1/2 z-[100] flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-2xl border bg-surface/90 px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-xl sm:bottom-6 ${
            snackbar === 'success'
              ? 'border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'border-red-500/30 text-red-700 dark:text-red-300'
          }`}
          role="alert"
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
              snackbar === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
            aria-hidden
          >
            <Icon name={snackbar === 'success' ? 'check' : 'close'} className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          {snackbar === 'success'
            ? labels.successMessage || 'Message sent successfully.'
            : submitError || labels.errSend || 'Error sending.'}
        </div>
      )}
    </Section>
  )
}
