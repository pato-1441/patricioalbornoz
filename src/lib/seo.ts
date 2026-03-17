import type { Locale } from '@/lib/locale'
import { supportedLocales } from '@/lib/locale'
import { buildAbsoluteUrl, defaultOgImagePath, siteAuthorName, siteHandle, siteName } from '@/lib/site'

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>

type SeoHeadOptions = {
  title: string
  description: string
  locale: Locale
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  robots?: string
  publishedTime?: string
  alternates?: Partial<Record<Locale, string>>
  structuredData?: StructuredData
  authorName?: string
}

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_AR',
}

export function createSeoHead({
  title,
  description,
  locale,
  path,
  image = defaultOgImagePath,
  imageAlt,
  type = 'website',
  robots = 'index,follow',
  publishedTime,
  alternates,
  structuredData,
  authorName = siteAuthorName,
}: SeoHeadOptions) {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const canonicalUrl = buildAbsoluteUrl(path)
  const imageUrl = buildAbsoluteUrl(image)
  const resolvedImageAlt = imageAlt ?? title

  const links = [
    { rel: 'canonical', href: canonicalUrl },
    ...supportedLocales.flatMap((candidateLocale) => {
      const alternatePath = alternates?.[candidateLocale]

      if (!alternatePath) {
        return []
      }

      return [
        {
          rel: 'alternate',
          hrefLang: candidateLocale,
          href: buildAbsoluteUrl(alternatePath),
        },
      ]
    }),
  ]

  if (alternates && Object.keys(alternates).length > 0) {
    links.push({
      rel: 'alternate',
      hrefLang: 'x-default' as never,
      href: buildAbsoluteUrl('/'),
    })
  }

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { name: 'author', content: authorName },
      { property: 'og:type', content: type },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: resolvedImageAlt },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: ogLocaleMap[locale] },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: resolvedImageAlt },
      { name: 'twitter:site', content: siteHandle },
      { name: 'twitter:creator', content: siteHandle },
      ...(type === 'article' ? [{ property: 'article:author', content: authorName }] : []),
      ...(publishedTime
        ? [{ property: 'article:published_time', content: publishedTime }]
        : []),
      ...(structuredData ? [{ 'script:ld+json': structuredData }] : []),
    ],
    links,
  }
}
