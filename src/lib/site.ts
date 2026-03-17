export const siteName = 'Patricio Albornoz'
export const siteAuthorName = 'Patricio Albornoz'
export const siteHandle = '@patoalbornozz'
export const siteUrlFallback = 'https://patricioalbornoz.com'
export const defaultOgImagePath = '/profile.jpeg'

export function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, '')
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin.replace(/\/+$/, '')
  }

  return siteUrlFallback
}

export function buildAbsoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}
