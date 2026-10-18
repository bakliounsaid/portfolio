/**
 * Carte réutilisable : bordure fine, halo + liseré qui suivent la souris, légère élévation au survol.
 * `as` permet de rendre la carte comme un lien (ex. as={Link} to="...").
 * `lift={false}` désactive l'élévation (cartes statiques).
 */

export default function Card({ as: Tag = 'div', lift = true, className = '', children, onMouseMove, ...rest }) {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    onMouseMove?.(e)
  }

  return (
    <Tag className={`card ${lift ? 'card-lift' : ''} ${className}`} onMouseMove={handleMove} {...rest}>
      {children}
    </Tag>
  )
}
