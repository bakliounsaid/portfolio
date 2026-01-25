/**
 * Typewriter – Reusable typewriter animation: text appears letter by letter with a blinking cursor.
 *
 * @param {string} text - The full string to display (typed letter by letter).
 * @param {number} [speed=100] - Delay in ms between each letter.
 * @param {string} [className] - Optional Tailwind classes for the wrapper (e.g. text-slate-600).
 *
 * How it works:
 * - useEffect runs when `text` or `speed` changes: resets `display` and starts an interval.
 * - Each tick appends the next character from `text` to `display`.
 * - The cursor is a span with animate-pulse for a blinking effect.
 * - When `text` changes (e.g. language switch), the animation restarts from scratch.
 */

import { useState, useEffect } from 'react'

export default function Typewriter({ text = '', speed = 100, className = '' }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
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
    <span className={className}>
      {display}
      <span className="animate-pulse" aria-hidden>
        |
      </span>
    </span>
  )
}
