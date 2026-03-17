import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const contentDir = path.join(rootDir, 'src', 'content', 'articles')
const distDir = path.join(rootDir, 'dist')
const distIndexPath = path.join(distDir, 'index.html')

const siteName = 'Patricio Albornoz'
const siteAuthorName = 'Patricio Albornoz'
const siteHandle = '@patoalbornozz'
const siteUrl = (process.env.VITE_SITE_URL || 'https://patricioalbornoz.com').replace(/\/+$/, '')
const defaultOgImage = '/og.webp'

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function parseFrontmatter(rawFile) {
  const raw = rawFile.replace(/\r\n/g, '\n')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Article markdown is missing frontmatter block')
  }

  const [, frontmatterText] = match
  const map = new Map()

  for (const line of frontmatterText.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const separator = trimmed.indexOf(':')
    if (separator < 0) continue

    const key = trimmed.slice(0, separator).trim()
    const value = trimmed
      .slice(separator + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2')

    map.set(key, value)
  }

  return {
    title: map.get('title') ?? 'Untitled',
    date: map.get('date') ?? '',
    excerpt: map.get('excerpt') ?? '',
    coverImage: map.get('coverImage') ?? '',
    coverAlt: map.get('coverAlt') ?? '',
    ogImage: map.get('ogImage') ?? '',
    ogImageAlt: map.get('ogImageAlt') ?? '',
    published: map.get('published')?.toLowerCase() === 'true',
  }
}

function parseArticleIdentity(filename) {
  const basename = filename.replace(/\.md$/, '')
  const match = basename.match(/^(.*)\.(en|es)$/)

  if (!match) {
    return { slug: basename, locale: 'en' }
  }

  return { slug: match[1], locale: match[2] }
}

function buildAbsoluteUrl(pathname = '/') {
  if (!pathname) {
    return siteUrl
  }

  if (/^https?:\/\//.test(pathname)) {
    return pathname
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${siteUrl}${normalizedPath}`
}

function getOgLocale(locale) {
  return locale === 'es' ? 'es_AR' : 'en_US'
}

function normalizePathname(pathname) {
  const normalized = pathname.replace(/\/+$/, '')
  return normalized || '/'
}

async function readBuiltAssets() {
  const indexHtml = await fs.readFile(distIndexPath, 'utf8')
  const scriptMatch = indexHtml.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/i)

  if (!scriptMatch?.[1]) {
    throw new Error('Unable to find app script in dist/index.html')
  }

  const styleMatches = Array.from(
    indexHtml.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/gi),
  )
  const styles = styleMatches.map((match) => match[1]).filter(Boolean)

  return {
    script: scriptMatch[1],
    styles,
  }
}

function renderMetaTags({
  fullTitle,
  description,
  canonicalUrl,
  imageUrl,
  imageAlt,
  ogLocale,
  locale,
  publishedTime,
  alternateLocales,
}) {
  const alternates = []

  for (const [candidateLocale, href] of Object.entries(alternateLocales)) {
    alternates.push(
      `<link rel="alternate" hrefLang="${candidateLocale}" href="${escapeHtml(buildAbsoluteUrl(href))}" />`,
    )
  }

  if (alternates.length > 0) {
    alternates.push(`<link rel="alternate" hrefLang="x-default" href="${escapeHtml(buildAbsoluteUrl('/'))}" />`)
  }

  const articlePublishedTag = publishedTime
    ? `<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />`
    : ''

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fullTitle,
    description,
    datePublished: publishedTime,
    author: { '@type': 'Person', name: siteAuthorName },
    publisher: { '@type': 'Person', name: siteAuthorName },
    image: imageUrl,
    inLanguage: locale,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  }
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, '\\u003c')

  return `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <meta name="author" content="${escapeHtml(siteAuthorName)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
    <meta property="og:locale" content="${escapeHtml(ogLocale)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta name="twitter:site" content="${escapeHtml(siteHandle)}" />
    <meta name="twitter:creator" content="${escapeHtml(siteHandle)}" />
    <meta property="article:author" content="${escapeHtml(siteAuthorName)}" />
    ${articlePublishedTag}
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    ${alternates.join('\n    ')}
    <script type="application/ld+json">${structuredDataJson}</script>
  `
}

function renderArticleHtml({ routePath, locale, fullTitle, meta, alternateLocales, assets }) {
  const canonicalUrl = buildAbsoluteUrl(routePath)
  const imagePath = meta.ogImage || meta.coverImage || defaultOgImage
  const imageAlt = meta.ogImageAlt || meta.coverAlt || meta.title
  const imageUrl = buildAbsoluteUrl(imagePath)
  const ogLocale = getOgLocale(locale)
  const styleTags = assets.styles
    .map((href) => `<link rel="stylesheet" crossorigin href="${escapeHtml(href)}" />`)
    .join('\n    ')
  const metaTags = renderMetaTags({
    fullTitle,
    description: meta.excerpt,
    canonicalUrl,
    imageUrl,
    imageAlt,
    ogLocale,
    locale,
    publishedTime: meta.date,
    alternateLocales,
  })

  return `<!DOCTYPE html>
<html lang="${escapeHtml(locale)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f5efe5" />
    <title>${escapeHtml(fullTitle)}</title>
    ${metaTags}
    ${styleTags}
    <script defer src="https://cloud.umami.is/script.js" data-website-id="91e34171-b2bd-41d7-b0a8-7fc9f3c39d60"></script>
    <script type="module" crossorigin src="${escapeHtml(assets.script)}"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`
}

function toOutputFilePath(routePath) {
  const cleanPath = normalizePathname(routePath).replace(/^\/+/, '')
  return path.join(distDir, cleanPath, 'index.html')
}

async function readPublishedArticles() {
  const files = await fs.readdir(contentDir)
  const records = new Map()

  for (const filename of files) {
    if (!filename.endsWith('.md')) continue

    const raw = await fs.readFile(path.join(contentDir, filename), 'utf8')
    const meta = parseFrontmatter(raw)

    if (!meta.published) {
      continue
    }

    const { slug, locale } = parseArticleIdentity(filename)
    const existing = records.get(slug) ?? {}
    existing[locale] = meta
    records.set(slug, existing)
  }

  return records
}

async function main() {
  const assets = await readBuiltAssets()
  const records = await readPublishedArticles()

  for (const [slug, translations] of records.entries()) {
    for (const locale of ['en', 'es']) {
      const meta = translations[locale]
      if (!meta) continue

      const routePath = `/${locale}/articles/${slug}`
      const fullTitle = meta.title.includes(siteName) ? meta.title : `${meta.title} | ${siteName}`
      const alternateLocales = {}

      for (const candidateLocale of ['en', 'es']) {
        if (translations[candidateLocale]) {
          alternateLocales[candidateLocale] = `/${candidateLocale}/articles/${slug}`
        }
      }

      const html = renderArticleHtml({
        routePath,
        locale,
        fullTitle,
        meta,
        alternateLocales,
        assets,
      })

      const outputPath = toOutputFilePath(routePath)
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, html, 'utf8')
      console.log(`Prerendered ${routePath}`)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
