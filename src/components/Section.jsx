/**
 * Conteneur de section avec titre optionnel (barre d'accent + titre).
 */

export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`py-14 md:py-20 scroll-mt-16 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {title && (
          <div className="mb-10 md:mb-12">
            <span className="block w-10 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 mb-3" aria-hidden />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
