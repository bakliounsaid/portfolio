/**
 * Carte réutilisable : fond slate-800, bordure indigo, ombre. Adapté au fond noir.
 */

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border-2 border-slate-300 dark:border-indigo-400/60 dark:bg-slate-800/95 dark:shadow-xl dark:shadow-black/50 bg-white border-slate-200 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}
