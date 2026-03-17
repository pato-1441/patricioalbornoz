import { useLocation } from '@tanstack/react-router'
import type { Locale } from '@/lib/locale'
import { useLocale } from '@/context/locale-context'
import { buildLocalizedPath, persistLocalePreference } from '@/lib/locale'

const localeOptions: Array<{ value: Locale; labelKey: 'spanish' | 'english' }> = [
  { value: 'es', labelKey: 'spanish' },
  { value: 'en', labelKey: 'english' },
]

export function LanguageToggle() {
  const { locale, t } = useLocale()
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const search = typeof window === 'undefined' ? '' : window.location.search
  const hash = typeof window === 'undefined' ? '' : window.location.hash

  function handleChange(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    persistLocalePreference(nextLocale)
    window.location.assign(`${buildLocalizedPath(nextLocale, pathname)}${search}${hash}`)
  }

  return (
    <div className="space-y-2">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {t.locale.label}
      </p>
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
            >
              {t.locale[option.labelKey]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
