/**
 * Conteneur de section : index monospace (« 01 / »), titre, ligne fine qui s'estompe.
 */

import Reveal from './Reveal'

export default function Section({ id, index, title, children, className = '' }) {
  return (
    <section id={id} className={`relative py-20 md:py-28 scroll-mt-20 ${className}`}>
      <div className="container-x">
        {title && (
          <Reveal className="mb-10 md:mb-14 flex items-center gap-4">
            {index && (
              <span className="font-mono text-xs text-accent shrink-0" aria-hidden>
                {index} /
              </span>
            )}
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-fg">{title}</h2>
            <span className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-line to-transparent" aria-hidden />
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
