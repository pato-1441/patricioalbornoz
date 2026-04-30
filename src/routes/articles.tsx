import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { buildLocalizedPath, detectPreferredLocale } from '@/lib/locale'

export const Route = createFileRoute('/articles')({
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex,follow' }],
  }),
  component: ArticlesRedirect,
})

function ArticlesRedirect() {
  useEffect(() => {
    const locale = detectPreferredLocale({
      cookieHeader: document.cookie,
      navigatorLanguages: navigator.languages,
    })

    window.location.replace(buildLocalizedPath(locale, '/articles'))
  }, [])

  return null
}
