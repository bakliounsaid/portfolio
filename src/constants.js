/**
 * Constantes partagées (chemins d’assets, etc.).
 * assetUrl préfixe le base (ex. /portfolio/) pour que les images fonctionnent avec base !== '/'.
 */

function getBase() {
  return (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
}

export function assetUrl(path) {
  const p = (path || '').replace(/^\//, '')
  const b = getBase()
  return (b ? b + '/' : '/') + p
}

export const AVATAR = assetUrl('images/avatar.png')
