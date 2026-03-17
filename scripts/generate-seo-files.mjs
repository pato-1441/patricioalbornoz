import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const contentDir = path.join(rootDir, 'src', 'content', 'articles')
const publicDir = path.join(rootDir, 'public')

const siteName = 'Patricio Albornoz'
const siteUrlFallback = 'https://patricioalbornoz.com'
const siteUrl = (process.env.VITE_SITE_URL || siteUrlFallback).replace(/\/+$/, '')
const siteDescription =
  'Portfolio of Patricio Albornoz about product interfaces, frontend craft, autonomous testing, and design systems.'
const supportedLocales = ['en', 'es']

function buildUrl(pathname = '/') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${siteUrl}${normalizedPath}`
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
    published: map.get('published')?.toLowerCase() === 'true',
  }
}

function readArticleRecords() {
  const articleFiles = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'))
  const records = new Map()

  for (const filename of articleFiles) {
    const raw = fs.readFileSync(path.join(contentDir, filename), 'utf8')
    const meta = parseFrontmatter(raw)
    const basename = filename.replace(/\.md$/, '')
    const match = basename.match(/^(.*)\.(en|es)$/)
    const slug = match ? match[1] : basename
    const locale = match ? match[2] : 'en'

    const existing = records.get(slug) ?? { slug, translations: {} }
    existing.translations[locale] = meta
    records.set(slug, existing)
  }

  return Array.from(records.values())
    .map((record) => {
      const publishedTranslations = Object.entries(record.translations).filter(
        ([, entry]) => entry.published === true,
      )

      if (publishedTranslations.length === 0) {
        return null
      }

      const english = record.translations.en?.published ? record.translations.en : undefined
      const fallback = english ?? record.translations.es ?? publishedTranslations[0]?.[1]
      const dateValues = publishedTranslations
        .map(([, entry]) => entry)
        .map((entry) => new Date(entry.date).getTime())
        .filter((value) => Number.isFinite(value))
      const latestTime = dateValues.length > 0 ? Math.max(...dateValues) : Date.now()

      return {
        slug: record.slug,
        lastmod: new Date(latestTime).toISOString(),
        translations: Object.fromEntries(
          publishedTranslations.map(([locale, entry]) => [
            locale,
            {
              title: entry.title,
              excerpt: entry.excerpt,
              path: `/${locale}/articles/${record.slug}`,
            },
          ]),
        ),
        fallback: {
          title: fallback?.title ?? record.slug,
          excerpt: fallback?.excerpt ?? '',
        },
      }
    })
    .filter((record) => record !== null)
    .sort((left, right) => right.lastmod.localeCompare(left.lastmod))
}

function writeFile(filename, content) {
  fs.writeFileSync(path.join(publicDir, filename), `${content.trim()}\n`, 'utf8')
}

const articles = readArticleRecords()
const latestArticleLastmod = articles[0]?.lastmod ?? new Date().toISOString()

function renderAlternateLinks(paths, xDefaultPath) {
  const localeLinks = supportedLocales
    .filter((locale) => paths[locale])
    .map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${buildUrl(paths[locale])}" />`,
    )

  if (xDefaultPath) {
    localeLinks.push(
      `<xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(xDefaultPath)}" />`,
    )
  }

  return localeLinks.join('\n    ')
}

const sitemapXml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${buildUrl('/en')}</loc>
    <lastmod>${latestArticleLastmod}</lastmod>
    ${renderAlternateLinks({ en: '/en', es: '/es' }, '/')}
  </url>
  <url>
    <loc>${buildUrl('/es')}</loc>
    <lastmod>${latestArticleLastmod}</lastmod>
    ${renderAlternateLinks({ en: '/en', es: '/es' }, '/')}
  </url>
  <url>
    <loc>${buildUrl('/en/articles')}</loc>
    <lastmod>${latestArticleLastmod}</lastmod>
    ${renderAlternateLinks({ en: '/en/articles', es: '/es/articles' }, '/articles')}
  </url>
  <url>
    <loc>${buildUrl('/es/articles')}</loc>
    <lastmod>${latestArticleLastmod}</lastmod>
    ${renderAlternateLinks({ en: '/en/articles', es: '/es/articles' }, '/articles')}
  </url>
  ${articles
    .flatMap((article) => {
      const alternatePaths = Object.fromEntries(
        Object.entries(article.translations).map(([locale, translation]) => [locale, translation.path]),
      )

      return Object.values(article.translations).map(
        (translation) => `
  <url>
    <loc>${buildUrl(translation.path)}</loc>
    <lastmod>${article.lastmod}</lastmod>
    ${renderAlternateLinks(alternatePaths, `/articles/${article.slug}`)}
  </url>`,
      )
    })
    .join('')}
</urlset>
`

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${buildUrl('/sitemap.xml')}
`

const llmsTxt = `
# ${siteName}

> ${siteDescription}

## Primary pages

- [Home (EN)](${buildUrl('/en')}): Personal portfolio homepage with work, writing, and profile information.
- [Inicio (ES)](${buildUrl('/es')}): Version en espanol del portfolio personal, con trabajo, escritos y perfil.
- [Articles (EN)](${buildUrl('/en/articles')}): Writing archive covering frontend systems, product interfaces, and autonomous testing.
- [Articulos (ES)](${buildUrl('/es/articles')}): Archivo de escritos sobre interfaces de producto, frontend y testing autonomo.

## Articles

${articles
  .flatMap((article) =>
    Object.entries(article.translations).map(
      ([locale, translation]) =>
        `- [${translation.title}](${buildUrl(translation.path)}): ${translation.excerpt} (${locale.toUpperCase()})`,
    ),
  )
  .join('\n')}
`

writeFile('sitemap.xml', sitemapXml)
writeFile('robots.txt', robotsTxt)
writeFile('llms.txt', llmsTxt)

console.log(`Generated SEO files for ${siteUrl}`)
