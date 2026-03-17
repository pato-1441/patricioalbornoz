import { createContext, useContext, useEffect, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import type { Locale } from '@/lib/locale'
import { copy } from '@/data/i18n'

type LocaleContextValue = {
  locale: Locale
  t: (typeof copy)[Locale]
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

type LocaleProviderProps = PropsWithChildren<{
  locale: Locale
}>

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: copy[locale],
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)

  if (value === null) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return value
}
