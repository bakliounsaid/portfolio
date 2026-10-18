/**
 * Chat : discussion fluide, bulle + avatar sur chaque réponse, questions libres, contexte et relances.
 * Langue = langue du portfolio (réponses construites à partir des traductions).
 */

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'
import { AVATAR } from '../constants'
import Icon from './Icon'

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
  const { t, lang } = useLanguage()
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
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_14px_36px_-12px_rgb(var(--g2)/0.9)] ring-1 ring-white/15 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-offset-4 sm:bottom-6 sm:right-6"
        aria-label="Chat"
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        <Icon name={open ? 'close' : 'chat'} className="h-6 w-6" strokeWidth={1.75} />
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={profile.hero.name}
          className="chat-float fixed inset-x-3 bottom-24 z-50 flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/95 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px]"
        >
          {/* En-tête avec ta photo */}
          <div className="relative flex items-center gap-3 border-b border-line p-4">
            <span className="absolute inset-x-0 top-0 h-px bg-brand opacity-70" aria-hidden />
            <span className="relative shrink-0">
              <img src={AVATAR} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/40" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-emerald-500" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display font-semibold text-fg">{profile.hero.name}</p>
              <p className="truncate text-xs text-subtle">{c.welcome || 'How can I help you?'}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
              aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
            >
              <Icon name="close" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {/* Zone des messages — discussion */}
          <div ref={scrollRef} className="chat-scroll flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-3">
                {/* Premier message de bienvenue (toi) pour lancer la discussion */}
                <div className="flex gap-2">
                  <img src={AVATAR} alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover" />
                  <p className="flex-1 rounded-2xl rounded-bl-md border border-line bg-bg px-3.5 py-2.5 text-sm leading-relaxed text-fg">
                    {c.welcome || 'Comment puis-je vous aider ?'}
                  </p>
                </div>
                <p className="pl-10 text-xs leading-relaxed text-subtle">{c.askAnything || 'Posez une question ou choisissez un sujet.'}</p>
                <div className="flex flex-wrap gap-2 pl-10">
                  {intents.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleIntent(key)}
                      className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
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
                    <p className="max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm text-white shadow-sm" style={{ backgroundImage: 'linear-gradient(120deg, #4f46e5, #7c3aed)' }}>
                      {msg.content}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <img src={AVATAR} alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover" />
                      <p className="min-w-0 flex-1 break-words rounded-2xl rounded-bl-md border border-line bg-bg px-3.5 py-2.5 text-sm leading-relaxed text-fg">
                        {msg.content}
                      </p>
                    </div>
                    {/* Relances sous la dernière réponse */}
                    {i === messages.length - 1 && msg.topic && getFollowUps(msg.topic).length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1.5 pl-10">
                        {getFollowUps(msg.topic).map((s, j) => (
                          <button
                            key={j}
                            type="button"
                            onClick={() => handleFollowUp(s.query, s.label)}
                            className="rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
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
                <img src={AVATAR} alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover" />
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-bg px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-subtle" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-subtle" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-subtle" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="flex gap-2 border-t border-line p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={c.placeholder || 'Ask a question...'}
              aria-label={c.placeholder || 'Message'}
              className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-base text-fg placeholder:text-subtle transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleSend}
              className="btn-primary h-11 w-11 shrink-0 px-0"
              aria-label={c.send || 'Send'}
              title={c.send || 'Send'}
            >
              <Icon name="send" className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
