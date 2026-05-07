import { useLocation } from '@tanstack/react-router'
import type { Locale } from '@/lib/locale'
import { useLocale } from '@/context/locale-context'
import { buildLocalizedPath, persistLocalePreference } from '@/lib/locale'

const localeOptions: Array<{
  value: Locale
  labelKey: 'spanish' | 'english'
  nameKey: 'spanishName' | 'englishName'
  flag: string
}> = [
  { value: 'en', labelKey: 'english', nameKey: 'englishName', flag: '🇺🇸' },
  { value: 'es', labelKey: 'spanish', nameKey: 'spanishName', flag: '🇪🇸' },
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
    // Do not carry over the hash — it would scroll to #articles, #work, etc. on the new locale.
    window.location.assign(
      `${buildLocalizedPath(nextLocale, pathname)}${search}`,
    )
  }

  return (
    <div className="language-toggle" role="group" aria-label={t.locale.label}>
      {localeOptions.map((option, index) => {
        const isActive = locale === option.value

        return (
          <span key={option.value} className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChange(option.value)}
              className={`language-toggle-option ${isActive ? 'language-toggle-option-active' : ''}`}
              aria-pressed={isActive}
              aria-label={t.locale[option.nameKey]}
            >
              <span className="language-toggle-option-inner">
                <span aria-hidden>{option.flag}</span>
                <span>{t.locale[option.labelKey]}</span>
              </span>
            </button>
            {index < localeOptions.length - 1 ? (
              <span className="text-xs text-neutral-400" aria-hidden>
                /
              </span>
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
