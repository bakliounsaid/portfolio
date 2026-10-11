/**
 * Carte réutilisable : bordure fine, léger relief au survol, fond slate-900 en dark.
 */

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-300 dark:hover:border-indigo-500/40 ${className}`}
    >
      {children}
    </div>
  )
}
