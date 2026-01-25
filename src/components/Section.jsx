/**
 * Conteneur de section avec titre optionnel.
 */

export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`py-4 md:py-6 scroll-mt-20 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8 md:mb-10">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}
