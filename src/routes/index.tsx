import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { buildLocalizedPath, detectPreferredLocale } from '@/lib/locale'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex,follow' }],
  }),
  component: IndexRedirect,
})

function IndexRedirect() {
  useEffect(() => {
    const locale = detectPreferredLocale({
      cookieHeader: document.cookie,
      navigatorLanguages: navigator.languages,
    })

    window.location.replace(buildLocalizedPath(locale))
  }, [])

  return null
}
