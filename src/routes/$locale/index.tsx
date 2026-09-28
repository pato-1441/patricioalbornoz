import { createFileRoute } from '@tanstack/react-router'
import { PortfolioTabs } from '@/components/portfolio/portfolio-tabs'
import { copy } from '@/data/i18n'
import { defaultLocale, isLocale } from '@/lib/locale'
import { createSeoHead } from '@/lib/seo'
import { buildAbsoluteUrl, siteName } from '@/lib/site'

function resolveLocale(value: string) {
  return isLocale(value) ? value : defaultLocale
}

export const Route = createFileRoute('/$locale/')({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale)
    const t = copy[locale]

    return createSeoHead({
      title: t.seo.homeTitle,
      description: t.seo.homeDescription,
      locale,
      path: `/${locale}`,
      alternates: {
        en: '/en',
        es: '/es',
      },
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: buildAbsoluteUrl(`/${locale}`),
          description: t.seo.homeDescription,
          inLanguage: locale,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteName,
          url: buildAbsoluteUrl(`/${locale}`),
          image: buildAbsoluteUrl('/patricio-paris.webp'),
          jobTitle: 'Product Engineer',
          worksFor: {
            '@type': 'Organization',
            name: 'Tambo',
          },
          sameAs: [
            'https://x.com/patoalbornozz',
            'https://github.com/pato-1441',
            'https://www.linkedin.com/in/patoalbornoz/',
          ],
        },
      ],
    })
  },
  component: App,
})

function App() {
  return <PortfolioTabs />
}
