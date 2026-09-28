import { useLocation } from '@tanstack/react-router'
import type { Locale } from '@/lib/locale'
import { useLocale } from '@/context/locale-context'
import { buildLocalizedPath, persistLocalePreference } from '@/lib/locale'

const localeOptions: Array<{
  value: Locale
  flag: string
  nameKey: 'spanishName' | 'englishName'
}> = [
  { value: 'es', flag: '🇦🇷', nameKey: 'spanishName' },
  { value: 'en', flag: '🇺🇸', nameKey: 'englishName' },
]

export function LanguageToggle() {
  const { locale, t } = useLocale()
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const search = typeof window === 'undefined' ? '' : window.location.search

  function handleChange(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    persistLocalePreference(nextLocale)
    window.location.assign(
      `${buildLocalizedPath(nextLocale, pathname)}${search}${window.location.hash}`,
    )
  }

  return (
    <div className="language-toggle" role="group" aria-label={t.locale.label}>
      {localeOptions.map((option) => {
        const isActive = locale === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleChange(option.value)}
            className={`language-toggle-option ${isActive ? 'language-toggle-option-active' : ''}`}
            aria-pressed={isActive}
            aria-label={t.locale[option.nameKey]}
            title={t.locale[option.nameKey]}
          >
            <span aria-hidden="true">{option.flag}</span>
          </button>
        )
      })}
    </div>
  )
}
