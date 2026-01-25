/**
 * Carte réutilisable : fond clair en light, fond slate-900 (bleuté) en dark pour harmonie avec le noir.
 */

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border-2 border-slate-300 dark:border-indigo-400/50 bg-white dark:bg-slate-900/95 shadow-sm dark:shadow-xl dark:shadow-black/40 ${className}`}
    >
      {children}
    </div>
  )
}
