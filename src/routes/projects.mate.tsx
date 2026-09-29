import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { detectPreferredLocale } from '@/lib/locale'

export const Route = createFileRoute('/projects/mate')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex,follow' }] }),
  component: ProjectRedirect,
})

function ProjectRedirect() {
  useEffect(() => {
    const locale = detectPreferredLocale({
      cookieHeader: document.cookie,
      navigatorLanguages: navigator.languages,
    })
    window.location.replace(`/${locale}/projects/mate`)
  }, [])
  return null
}
