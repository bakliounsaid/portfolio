/**
 * Chat : discussion fluide, bulle + avatar sur chaque réponse, questions libres, contexte et relances.
 * Langue = langue du portfolio (réponses construites à partir des traductions).
 */

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import { AVATAR } from '../constants'

// Minuscules + suppression des accents : « Compétences » → « competences ».
// Sans ça, \b ne reconnaît pas les mots accentués (é n'est pas un caractère de mot en regex JS).
const normalize = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

// Mots-clés (sans accents) → id du projet
const PROJECT_KEYWORDS = [
  [/\b(rideaux?|curtains?|rdv|rendez[- ]vous|appointments?)\b/, 'curtain-rdv'],
  [/\b(football|club|sport)\b/, 'football-club'],
  [/\b(nft|oeuvre|art|mint|landing)\b/, 'nft-landing'],
  [/\b(correxia|correction|ocr|examens?|exams?)\b/, 'correxia'],
]

export default function ChatWidget() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [lastTopic, setLastTopic] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)
  const c = t.chat || {}

  // Défilement automatique vers le dernier message
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isTyping, open])

  const intents = [
    { key: 'experience', label: c.intents?.experience, query: 'experience' },
    { key: 'projects', label: c.intents?.projects, query: 'projets' },
    { key: 'skills', label: c.intents?.skills, query: 'compétences' },
    { key: 'contact', label: c.intents?.contact, query: 'contact' },
  ].filter((i) => i.label)

  // Données dans la langue courante (fallback : profile.js)
  const experience = t.experience?.entries || profile.experience
  const education = t.education?.entries || profile.education || []
  const interests = t.interests?.entries || profile.interests || []
  const sk = t.skills || {}
  const allSkills = [
    ...(sk.backendItems || profile.skills?.backend || []),
    ...(sk.frontendItems || profile.skills?.frontend || []),
    ...(sk.databasesItems || profile.skills?.databases || []),
    ...(sk.toolsItems || profile.skills?.tools || []),
    ...(sk.aiItems || profile.skills?.ai || []),
  ]
  const projectText = (p, full = false) => {
    const pt = t.projects?.[p.id] || {}
    const desc = full ? (pt.fullDescription || p.fullDescription || pt.description || p.description) : (pt.description || p.description)
    return `${pt.title || p.title} : ${desc}`
  }

  const matchReply = (text, ctx = {}) => {
    const lower = normalize(text)
    const { lastTopic: topic } = ctx
    const isProjectsTopic = (topic || '').startsWith('projects')

    // Projet précis mentionné (prioritaire, même dans une relance « en savoir plus sur correxia »)
    const hit = PROJECT_KEYWORDS.find(([re]) => re.test(lower))
    if (hit) {
      const p = profile.projects.find((x) => x.id === hit[1])
      if (p) return { reply: projectText(p, true), topic: `projects:${p.id}` }
    }

    // « Ce projet », « that project » : reprend le dernier projet évoqué
    if (isProjectsTopic && /\b(that\s*project|this\s*project|ce\s*projet|celui[- ]la)\b/.test(lower)) {
      const p = profile.projects.find((x) => x.id === topic.split(':')[1])
      return p ? { reply: projectText(p, true), topic } : { reply: c.whichProject || '', topic: 'projects' }
    }

    // Relances : "en savoir plus", "continue", "what else", "autre chose", "détails"
    const isFollowUp = /\b(more|plus|continue|tell\s*me\s*more|precise|details?|what\s*else|autre\s*chose|quoi\s*d'autre|next|suivant|encore|again)\b/.test(lower)
    if (isFollowUp && topic) {
      if (isProjectsTopic) return { reply: c.whichProject || '', topic: 'projects' }
      if (topic === 'experience') {
        const e = experience[0]
        const extra = (e?.points || [])[1] || (e?.points || [])[0] || ''
        const more = e ? `${e.title} @ ${e.company} — ${extra}` : ''
        return { reply: more + (more ? '. ' : '') + (c.alsoAsk || ''), topic: 'experience' }
      }
      if (topic === 'skills') return { reply: allSkills.join(', '), topic: 'skills' }
    }

    // Projets (général)
    if (/\b(projets?|projects?|portfolio|realisations?)\b/.test(lower))
      return { reply: profile.projects.map((p) => projectText(p)).join(' | '), topic: 'projects' }

    // Compétences / technos
    if (/\b(skills?|competences?|technos?|technologies?|tech|stack|laravel|php|python|fastapi|java|spring|vue(\.?js)?|javascript|js|livewire|mysql|postgres(ql)?|api|docker|git|frontend|front|backend|back)\b/.test(lower))
      return { reply: allSkills.join(', '), topic: 'skills' }

    // Expérience
    if (/\b(exp|experiences?|xp|travail|work|jobs?|emplois?|fb|fb-technologies|autoentrepreneur|freelance|cdta|college|parcours|background|career|carriere)\b/.test(lower)) {
      const txt = experience.map((e) => `${e.title} @ ${e.company} (${e.period}) — ${(e.points || [])[0] || ''}`).join(' | ')
      return { reply: txt, topic: 'experience' }
    }

    // Formation / école
    if (/\b(formations?|education|ecoles?|school|etudes?|studies|diplomes?|degree|licence|bachelor|master|hetic|boumerdes|universite|university)\b/.test(lower))
      return { reply: education.map((e) => `${e.title} – ${e.school} (${e.period})`).join('. '), topic: 'education' }

    // Contact (cas précis d'abord)
    if (/\b(tel|phone|telephone|numero|number)\b/.test(lower)) return { reply: profile.contact.phone, topic: 'contact' }
    if (/\b(linkedin|linked)\b/.test(lower)) return { reply: profile.contact.linkedin, topic: 'contact' }
    if (/\b(github|git\s*hub)\b/.test(lower)) return { reply: profile.contact.github, topic: 'contact' }
    if (/\b(cv|resume|curriculum)\b/.test(lower)) return { reply: profile.contact.cv, topic: 'contact' }
    if (/\b(contacts?|contacter|joindre|reach|e-?mails?|mail|courriel|ecrire)\b/.test(lower))
      return { reply: `${profile.contact.email} | ${profile.contact.phone}`, topic: 'contact' }

    // Langues
    if (/\b(langues?|languages?|parles?|speak)\b/.test(lower))
      return { reply: c.languages || (profile.languages || []).join(', '), topic: 'languages' }

    // Centres d'intérêt
    if (/\b(interets?|interests?|passions?|loisirs?|hobbies|hobby)\b/.test(lower))
      return { reply: interests.map((i) => `${i.label} : ${i.description}`).join(' | '), topic: 'interests' }

    // Lieu / localisation
    if (/\b(ou\s*es|ou\s*habites?|where|based|location|localisation|paris|alger|algerie|algeria|france)\b/.test(lower))
      return { reply: c.location || profile.contact.location, topic: 'location' }

    // Qui / présentation (en dernier : « qui » apparaît dans beaucoup de phrases)
    if (/\b(qui|who|nom|name|presente|introduce|about\s*you|a\s*propos\s*de\s*(toi|vous))\b/.test(lower))
      return { reply: `${profile.hero.name}. ${t.hero?.tagline || profile.hero.tagline} ${profile.contact.email}`, topic: 'who' }

    // Fallback
    return { reply: (c.fallback || profile.hero.tagline) + ' ' + (c.suggestPrompt || ''), topic: 'fallback' }
  }

  const getFollowUps = (topic) => {
    const fu = c.followUps || {}
    if (topic === 'experience') return [{ label: fu.projects || c.intents?.projects, query: 'projets' }, { label: fu.contact || c.intents?.contact, query: 'contact' }]
    if ((topic || '').startsWith('projects')) return [{ label: fu.moreProject, query: 'projet rideaux' }, { label: fu.skills || c.intents?.skills, query: 'compétences' }, { label: fu.contact || c.intents?.contact, query: 'contact' }].filter((s) => s.label)
    if (topic === 'skills') return [{ label: fu.experience || c.intents?.experience, query: 'experience' }, { label: fu.contact || c.intents?.contact, query: 'contact' }]
    if (topic === 'contact') return [{ label: fu.projects || c.intents?.projects, query: 'projets' }, { label: fu.experience || c.intents?.experience, query: 'experience' }]
    return [{ label: fu.experience || c.intents?.experience, query: 'experience' }, { label: fu.projects || c.intents?.projects, query: 'projets' }, { label: fu.contact || c.intents?.contact, query: 'contact' }]
  }

  const runReply = (userText, opts = {}) => {
    if (isTyping) return
    const { userLabel } = opts
    const res = matchReply(userText, { lastTopic })
    setLastTopic(res.topic)
    // Le message de l'utilisateur s'affiche tout de suite, la réponse après l'indicateur de saisie
    setMessages((m) => [...m, { role: 'user', content: userLabel || userText }])
    setIsTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: res.reply, topic: res.topic }])
      setIsTyping(false)
    }, 340)
  }

  const handleSend = () => {
    const txt = input.trim()
    if (!txt || isTyping) return
    setInput('')
    runReply(txt)
  }

  const handleIntent = (key) => {
    const item = intents.find((i) => i.key === key)
    const q = item?.query || key
    const label = item?.label || key
    runReply(q, { userLabel: label })
  }

  const handleFollowUp = (query, label) => {
    runReply(query, { userLabel: label })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="chat-btn-vibrate fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-black dark:border-white/80 dark:shadow-slate-200/50 dark:focus:ring-offset-slate-900 border-2 border-black dark:border-white/80 shadow-xl flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white"
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
              <p className="font-semibold text-black dark:text-white truncate">{profile.hero.name}</p>
              <p className="text-xs text-black dark:text-slate-400">{c.welcome || 'How can I help you?'}</p>
            </div>
          </div>

          {/* Zone des messages — discussion */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.length === 0 && (
              <div className="space-y-3">
                {/* Premier message de bienvenue (toi) pour lancer la discussion */}
                <div className="flex gap-2">
                  <img src={AVATAR} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-slate-300 dark:ring-slate-600" />
                  <p className="flex-1 px-3 py-2 rounded-2xl rounded-bl-md bg-slate-200 dark:bg-slate-700 text-black dark:text-slate-200 text-sm leading-relaxed">
                    {c.welcome || 'Comment puis-je vous aider ?'}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{c.askAnything || 'Posez une question ou choisissez un sujet.'}</p>
                <div className="flex flex-wrap gap-2">
                  {intents.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleIntent(key)}
                      className="px-3 py-1.5 text-sm rounded-full bg-slate-200 dark:bg-slate-700 text-black dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-indigo-600/50 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className="space-y-1">
                {msg.role === 'user' ? (
                  <div className="flex justify-end">
                    <p className="max-w-[85%] px-3 py-2 rounded-2xl rounded-br-md bg-black text-white dark:bg-indigo-600 text-sm shadow-sm">
                      {msg.content}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <img src={AVATAR} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-slate-300 dark:ring-slate-600" />
                      <p className="flex-1 px-3 py-2 rounded-2xl rounded-bl-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                    {/* Relances sous la dernière réponse */}
                    {i === messages.length - 1 && msg.topic && getFollowUps(msg.topic).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pl-10 mt-1">
                        {getFollowUps(msg.topic).map((s, j) => (
                          <button
                            key={j}
                            type="button"
                            onClick={() => handleFollowUp(s.query, s.label)}
                            className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700/80 text-black dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-indigo-600/40 hover:text-black dark:hover:text-indigo-200 transition-colors"
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <img src={AVATAR} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-slate-300 dark:ring-slate-600" />
                <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-slate-200 dark:bg-slate-700 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-slate-400 animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-slate-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-slate-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={c.placeholder || 'Ask a question...'}
              aria-label={c.placeholder || 'Message'}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSend}
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black text-sm font-medium transition-colors"
            >
              {c.send || 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
