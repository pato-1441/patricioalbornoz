import { useEffect } from 'react'
import type { Locale } from '@/lib/locale'
import { buildAbsoluteUrl, defaultOgImagePath, siteAuthorName, siteHandle, siteName } from '@/lib/site'

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  locale: Locale
  robots?: string
  publishedTime?: string
  structuredData?: StructuredData
  authorName?: string
}

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_AR',
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove()
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function setStructuredData(structuredData?: StructuredData) {
  const elementId = 'seo-structured-data'
  const existing = document.getElementById(elementId)

  if (!structuredData) {
    existing?.remove()
    return
  }

  const payload = Array.isArray(structuredData) ? structuredData : [structuredData]
  const script = existing ?? document.createElement('script')

  script.id = elementId
  script.setAttribute('type', 'application/ld+json')
  script.textContent = JSON.stringify(payload.length === 1 ? payload[0] : payload)

  if (!existing) {
    document.head.appendChild(script)
  }
}

export function Seo({
  title,
  description,
  path = '/',
  image = defaultOgImagePath,
  imageAlt,
  type = 'website',
  locale,
  robots = 'index,follow',
  publishedTime,
  structuredData,
  authorName = siteAuthorName,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
    const canonicalUrl = buildAbsoluteUrl(path)
    const imageUrl = buildAbsoluteUrl(image)
    const resolvedImageAlt = imageAlt ?? title

    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('name', 'robots', robots)
    setMeta('name', 'author', authorName)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
    setMeta('name', 'twitter:image:alt', resolvedImageAlt)
    setMeta('name', 'twitter:site', siteHandle)
    setMeta('name', 'twitter:creator', siteHandle)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', resolvedImageAlt)
    setMeta('property', 'og:site_name', siteName)
    setMeta('property', 'og:locale', ogLocaleMap[locale])

    if (publishedTime) {
      setMeta('property', 'article:published_time', publishedTime)
    } else {
      removeMeta('property', 'article:published_time')
    }

    if (type === 'article') {
      setMeta('property', 'article:author', authorName)
    } else {
      removeMeta('property', 'article:author')
    }

    setLink('canonical', canonicalUrl)
    setStructuredData(structuredData)
  }, [
    description,
    image,
    imageAlt,
    locale,
    path,
    publishedTime,
    robots,
    structuredData,
    title,
    type,
    authorName,
  ])

  return null
}
