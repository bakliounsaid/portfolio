/**
 * Contact – formulaire (email, subject, message) envoyé via Formspree.
 * Validation des champs, erreurs affichées, snackbar de succès ou d'erreur.
 * VITE_FORMSPREE_ID dans .env override la valeur par défaut.
 */

import { useState, useEffect } from 'react'
import Section from '../components/Section'
import { useLanguage } from '../context/LanguageContext'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xpqdzvaw'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact({ data }) {
  const { t } = useLanguage()
  const labels = t.contact || {}
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

  const inputBase = 'w-full px-3 py-2 rounded-lg border-2 bg-white dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors duration-200'
  const inputError = 'border-red-500 dark:border-red-400 focus:ring-red-400 dark:focus:ring-red-500'
  const inputOk = 'border-slate-300 dark:border-indigo-400/40 focus:ring-slate-400 dark:focus:ring-indigo-500'

  return (
    <Section id="contact" title={labels.title || 'Contact'}>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 rounded-xl border-2 border-slate-300 dark:border-indigo-400/50 bg-white dark:bg-slate-900/95 shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-black/40 space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {labels.email ?? 'Your email'}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((err) => ({ ...err, email: undefined })) }}
            placeholder={labels.placeholderEmail ?? 'your@email.com'}
            className={`${inputBase} ${errors.email ? inputError : inputOk}`}
            disabled={loading}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
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
          />
          {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {labels.message || 'Message'}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => { setMessage(e.target.value); setErrors((err) => ({ ...err, message: undefined })) }}
            placeholder={labels.placeholderMessage || 'Your message'}
            rows={4}
            className={`${inputBase} resize-y ${errors.message ? inputError : inputOk}`}
            disabled={loading}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
        </div>

        <div className="flex justify-center pt-1">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-100 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (labels.sending || 'Sending...') : (labels.send || 'Send')}
          </button>
        </div>
      </form>

      {/* Snackbar */}
      {snackbar && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium flex items-center gap-2 ${
            snackbar === 'success'
              ? 'bg-emerald-600 dark:bg-emerald-500'
              : 'bg-red-600 dark:bg-red-500'
          }`}
          role="alert"
        >
          {snackbar === 'success' ? (
            <>
              <span>✓</span> {labels.successMessage || 'Message sent successfully.'}
            </>
          ) : (
            <>
              <span>✕</span> {submitError || (labels.errSend || 'Error sending.')}
            </>
          )}
        </div>
      )}
    </Section>
  )
}
