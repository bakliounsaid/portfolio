/**
 * Chat : bulle avec votre photo (avatar) sur chaque réponse, questions libres, réponses à partir du profil.
 * Langue = langue du portfolio.
 */

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

const AVATAR = '/images/avatar.png'

export default function ChatWidget() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [replies, setReplies] = useState([])
  const c = t.chat || {}

  const intents = [
    { key: 'experience', label: c.intents?.experience },
    { key: 'projects', label: c.intents?.projects },
    { key: 'skills', label: c.intents?.skills },
    { key: 'contact', label: c.intents?.contact },
  ].filter(Boolean)

  const matchReply = (text) => {
    const lower = (text || '').toLowerCase().trim()

    // Qui / nom / you / présentation
    if (/\b(qui|who|you|nom|name|présente|present|tell\s*me|about\s*you)\b/.test(lower))
      return `${profile.hero.name}. ${profile.hero.tagline} ${profile.contact.email}`

    // Expérience
    if (/\b(exp|experience|xp|travail|work|job|emploi|fb|fb-technologies|autoentrepreneur|cdta|collège)\b/.test(lower)) {
      return profile.experience.map((e) => `${e.title} @ ${e.company} (${e.period}) — ${(e.points || [])[0] || ''}`).join(' | ')
    }

    // Projets (général ou par nom)
    if (/\b(projet|project)\b/.test(lower)) {
      const all = profile.projects.map((p) => `${p.title}: ${p.description || p.fullDescription || ''}`).join(' | ')
      if (/\b(rideaux|curtain|rdv)\b/.test(lower)) {
        const p = profile.projects.find((x) => /rideaux|curtain|rdv/i.test(x.title))
        return p ? `${p.title}: ${p.fullDescription || p.description}` : all
      }
      if (/\b(football|club|sport)\b/.test(lower)) {
        const p = profile.projects.find((x) => /football|club/i.test(x.title))
        return p ? `${p.title}: ${p.fullDescription || p.description}` : all
      }
      if (/\b(livraison|delivery)\b/.test(lower)) {
        const p = profile.projects.find((x) => /livraison|delivery/i.test(x.title))
        return p ? `${p.title}: ${p.fullDescription || p.description}` : all
      }
      if (/\b(alluqat|perdu|trouv|lost|found)\b/.test(lower)) {
        const p = profile.projects.find((x) => /alluqat/i.test(x.title))
        return p ? `${p.title}: ${p.fullDescription || p.description}` : all
      }
      return all
    }

    // Compétences / technos
    if (/\b(skill|compétence|laravel|php|livewire|mysql|api|docker|git)\b/.test(lower)) {
      const all = [...(profile.skills?.backend || []), ...(profile.skills?.databases || []), ...(profile.skills?.tools || []), ...(profile.skills?.ai || [])]
      return all.join(', ')
    }

    // Contact (email, tel, linkedin, github, cv)
    if (/\b(contact|mail|email|joindre|reach)\b/.test(lower))
      return `${profile.contact.email} | ${profile.contact.phone}`
    if (/\b(tel|phone|téléphone)\b/.test(lower)) return profile.contact.phone
    if (/\b(mail|email|e-mail|courriel)\b/.test(lower)) return profile.contact.email
    if (/\b(linkedin|linked)\b/.test(lower)) return profile.contact.linkedin
    if (/\b(github|git\s*hub)\b/.test(lower)) return profile.contact.github
    if (/\b(cv|resume|curriculum)\b/.test(lower)) return profile.contact.cv

    // Formation / école
    if (/\b(formation|education|école|school|étud|hetic|boumerdès|université)\b/.test(lower))
      return (profile.education || []).map((e) => `${e.title} – ${e.school} (${e.period})`).join('. ')

    // Langues
    if (/\b(langue|language)\b/.test(lower)) return (profile.languages || []).join(', ')

    // Centres d'intérêt
    if (/\b(intérêt|interest|passion|loisir)\b/.test(lower))
      return (profile.interests || []).map((i) => `${i.label}: ${i.description}`).join(' | ')

    // Lieu / localisation
    if (/\b(ou\s*es|where|paris|alger|algérie|france)\b/.test(lower))
      return `${profile.contact.location || 'Paris'}. Expérience en Algérie et en France.`

    // Fallback: invitation à poser des questions
    return (c.fallback || profile.hero.tagline) + ' ' + (c.suggestPrompt || '')
  }

  const handleSend = () => {
    if (!input.trim()) return
    const reply = matchReply(input.trim())
    setReplies((r) => [...r, { q: input.trim(), a: reply }])
    setInput('')
  }

  const handleIntent = (key) => {
    const q = key === 'experience' ? 'experience' : key === 'projects' ? 'projets' : key === 'skills' ? 'compétences' : 'contact'
    const reply = matchReply(q)
    setReplies((r) => [...r, { q: intents.find((i) => i.key === key)?.label || key, a: reply }])
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="chat-btn-vibrate fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-indigo-500/50 shadow-xl shadow-indigo-900/30 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-white dark:text-indigo-600 dark:hover:bg-slate-100 dark:border-white/80 dark:shadow-slate-200/50 dark:focus:ring-offset-slate-900"
        aria-label="Chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-600/80 dark:border-indigo-400/40 bg-slate-50 dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col chat-float">
          {/* En-tête avec ta photo */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 bg-white dark:bg-slate-800/80">
            <img src={AVATAR} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-400/50 shadow-md" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 dark:text-white truncate">{profile.hero.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{c.welcome || 'How can I help you?'}</p>
            </div>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-72">
            {replies.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">{c.askAnything || 'Ask me anything.'}</p>
                <div className="flex flex-wrap gap-2">
                  {intents.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleIntent(key)}
                      className="px-3 py-1.5 text-sm rounded-full bg-indigo-100 dark:bg-slate-700 text-indigo-700 dark:text-slate-200 hover:bg-indigo-200 dark:hover:bg-indigo-600/50 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {replies.map((r, i) => (
              <div key={i} className="space-y-2">
                {/* Message utilisateur à droite */}
                <div className="flex justify-end">
                  <p className="max-w-[85%] px-3 py-2 rounded-2xl rounded-br-md bg-indigo-600 text-white text-sm shadow-sm">
                    {r.q}
                  </p>
                </div>
                {/* Réponse avec ta photo à gauche */}
                <div className="flex gap-2">
                  <img src={AVATAR} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-slate-300 dark:ring-slate-600" />
                  <p className="flex-1 px-3 py-2 rounded-2xl rounded-bl-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                    {r.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Saisie */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={c.placeholder || 'Ask a question...'}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSend}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              {c.send || 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
