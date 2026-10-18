/**
 * Frise chronologique verticale partagée (Expérience, Formation).
 * Mobile : ligne à gauche, date au-dessus. Desktop : date en colonne à gauche, ligne au centre de la gouttière.
 * `isLive(item, i)` désigne l'entrée mise en avant (point lumineux).
 */

import Reveal from './Reveal'
import Card from './Card'

export default function Timeline({ items, isLive = () => false, renderItem }) {
  return (
    <ol className="relative">
      {/* Ligne verticale */}
      <span
        className="absolute top-2 bottom-2 left-[7px] md:left-[11.25rem] w-px bg-gradient-to-b from-accent/60 via-line to-transparent"
        aria-hidden
      />
      {items.map((item, i) => {
        const live = isLive(item, i)
        return (
          <Reveal
            as="li"
            key={i}
            delay={i * 80}
            className="relative grid md:grid-cols-[10rem_1fr] gap-x-10 gap-y-2 pl-8 md:pl-0 pb-8 last:pb-0"
          >
            {/* Point */}
            <span
              className={`absolute left-[7px] md:left-[11.25rem] top-1 md:top-7 -translate-x-1/2 h-3.5 w-3.5 rounded-full border-2 ${
                live
                  ? 'dot-live border-transparent bg-brand shadow-[0_0_16px_rgb(var(--g2)/0.7)]'
                  : 'border-line bg-bg'
              }`}
              aria-hidden
            />
            <p className={`font-mono text-xs md:text-right md:pt-6 ${live ? 'text-accent' : 'text-subtle'}`}>{item.period}</p>
            <Card lift={false} className={`p-5 md:p-6 ${live ? 'border-accent/40' : ''}`}>
              {renderItem(item, i, live)}
            </Card>
          </Reveal>
        )
      })}
    </ol>
  )
}
