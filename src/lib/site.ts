export const siteName = 'Patricio Albornoz'
export const siteAuthorName = 'Patricio Albornoz'
export const siteAuthorAvatar = '/patoalbornoz.jpg'
export const siteHandle = '@patoalbornozz'
export const siteUrl = 'https://patricioalbornoz.com'
export const defaultOgImagePath = '/profile.jpeg'

export function buildAbsoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}
