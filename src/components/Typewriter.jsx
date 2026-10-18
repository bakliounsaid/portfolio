/**
 * Typewriter – le texte apparaît lettre par lettre avec un curseur clignotant.
 *
 * @param {string} text - Texte complet.
 * @param {number} [speed=100] - Délai en ms entre chaque lettre.
 * @param {string} [className] - Classes du conteneur.
 *
 * Accessibilité : le texte complet est lu par les lecteurs d'écran (sr-only), la version animée est aria-hidden.
 * Mise en page : une copie invisible du texte réserve la place finale (aucun décalage pendant la frappe).
 * prefers-reduced-motion : le texte s'affiche directement.
 */

import { useState, useEffect } from 'react'

export default function Typewriter({ text = '', speed = 100, className = '' }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(text)
      return
    }
    setDisplay('')
    let i = 0
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(id)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className={`relative block ${className}`}>
      <span className="sr-only">{text}</span>
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {display}
        <span className="cursor-blink ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-accent" />
      </span>
    </span>
  )
}
