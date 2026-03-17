export const supportedLocales = ['en', 'es'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'en'
export const localeStorageKey = 'patricioalbornoz-locale'
export const localeCookieKey = 'patricioalbornoz-locale'

const localeDisplayMap: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-AR',
}

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es'
}

export function readStoredLocalePreference() {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.localStorage.getItem(localeStorageKey)
  if (stored !== null && isLocale(stored)) {
    return stored
  }

  return null
}

export function readCookieLocale(cookieHeader: string | null | undefined) {
  if (!cookieHeader) {
    return null
  }

  const segments = cookieHeader.split(';')

  for (const segment of segments) {
    const [rawKey, ...rawValueParts] = segment.trim().split('=')

    if (rawKey !== localeCookieKey) {
      continue
    }

    const value = rawValueParts.join('=').trim().toLowerCase()

    if (isLocale(value)) {
      return value
    }
  }

  return null
}

function detectLocaleFromLanguages(candidates: ReadonlyArray<string>) {
  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase()

    if (normalized.startsWith('es')) {
      return 'es'
    }

    if (normalized.startsWith('en')) {
      return 'en'
    }
  }

  return defaultLocale
}

export function parseAcceptLanguage(acceptLanguageHeader: string | null | undefined) {
  if (!acceptLanguageHeader) {
    return []
  }

  return acceptLanguageHeader
    .split(',')
    .map((candidate) => candidate.split(';')[0]?.trim() ?? '')
    .filter(Boolean)
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') {
    return defaultLocale
  }

  const candidates = navigator.languages.length > 0 ? navigator.languages : [navigator.language]
  return detectLocaleFromLanguages(candidates)
}

export function detectPreferredLocale(options?: {
  cookieHeader?: string | null
  acceptLanguageHeader?: string | null
  navigatorLanguages?: ReadonlyArray<string>
}) {
  const cookieLocale = readCookieLocale(options?.cookieHeader)

  if (cookieLocale) {
    return cookieLocale
  }

  const storedLocale = readStoredLocalePreference()

  if (storedLocale) {
    return storedLocale
  }

  if (options?.navigatorLanguages && options.navigatorLanguages.length > 0) {
    return detectLocaleFromLanguages(options.navigatorLanguages)
  }

  return detectLocaleFromLanguages(parseAcceptLanguage(options?.acceptLanguageHeader))
}

export function getLocaleFromPathname(pathname: string) {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const [firstSegment] = normalizedPathname.replace(/^\/+/, '').split('/')

  if (!firstSegment) {
    return null
  }

  return isLocale(firstSegment) ? firstSegment : null
}

export function stripLocaleFromPathname(pathname: string) {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const locale = getLocaleFromPathname(normalizedPathname)

  if (!locale) {
    return normalizedPathname || '/'
  }

  const strippedPathname = normalizedPathname.replace(new RegExp(`^/${locale}(?=/|$)`), '')
  return strippedPathname || '/'
}

export function buildLocalizedPath(locale: Locale, pathname = '/') {
  const localizedPathname = stripLocaleFromPathname(pathname)

  if (localizedPathname === '/') {
    return `/${locale}`
  }

  return `/${locale}${localizedPathname}`
}

export function persistLocalePreference(locale: Locale) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(localeStorageKey, locale)
  document.cookie = `${localeCookieKey}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
}

export function formatArticleDate(date: string, locale: Locale) {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(localeDisplayMap[locale], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed)
}

export function formatReadTime(minutes: number, locale: Locale) {
  if (locale === 'es') {
    return `${minutes} min de lectura`
  }

  return `${minutes} min read`
}
