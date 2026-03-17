import type { Locale } from '@/lib/locale'
import { defaultLocale, supportedLocales } from '@/lib/locale'

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: Array<string> }
  | { type: 'ol'; items: Array<string> }
  | { type: 'spacer' }
  | { type: 'image'; src: string; alt: string; caption?: string; maxHeight?: string }

export type Article = {
  slug: string
  locale: Locale
  publishedAt: string
  readTimeMinutes: number
  title: string
  excerpt: string
  coverImage?: string
  coverAlt?: string
  ogImage?: string
  ogImageAlt?: string
  pinned: boolean
  published: boolean
  blocks: Array<ArticleBlock>
}

type Frontmatter = {
  title: string
  date: string
  readTime: string
  excerpt: string
  coverImage?: string
  coverAlt?: string
  ogImage?: string
  ogImageAlt?: string
  pinned: boolean
  published: boolean
}

type ArticleRecord = {
  slug: string
  translations: Partial<Record<Locale, Article>>
}

const articleFiles = import.meta.glob<string>('../content/articles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function parseFrontmatter(rawFile: string): { meta: Frontmatter; body: string } {
  const raw = rawFile.replace(/\r\n/g, '\n')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Article markdown is missing frontmatter block')
  }

  const [, frontmatterText, body] = match
  const map = new Map<string, string>()

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
    meta: {
      title: map.get('title') ?? 'Untitled',
      date: map.get('date') ?? 'Unknown date',
      readTime: map.get('readTime') ?? '5 min read',
      excerpt: map.get('excerpt') ?? '',
      coverImage: map.get('coverImage') || undefined,
      coverAlt: map.get('coverAlt') || undefined,
      ogImage: map.get('ogImage') || undefined,
      ogImageAlt: map.get('ogImageAlt') || undefined,
      pinned: map.get('pinned')?.toLowerCase() === 'true',
      published: map.get('published')?.toLowerCase() === 'true',
    },
    body: body.trim(),
  }
}

function parseMarkdownBlocks(markdown: string): Array<ArticleBlock> {
  const blocks: Array<ArticleBlock> = []
  const lines = markdown.split('\n')
  const imagePattern = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/

  function parseImageTitle(title?: string): { caption?: string; maxHeight?: string } {
    if (!title) {
      return {}
    }

    const segments = title
      .split('|')
      .map((segment) => segment.trim())
      .filter(Boolean)

    let caption: string | undefined
    let maxHeight: string | undefined

    for (const segment of segments) {
      const maxHeightMatch = segment.match(/^max-height\s*=\s*(.+)$/i)

      if (maxHeightMatch) {
        const candidate = maxHeightMatch[1].trim()

        if (candidate && /^(\d+(\.\d+)?)(px|rem|em|vh|vw|%)$/i.test(candidate)) {
          maxHeight = candidate
        }

        continue
      }

      if (!caption) {
        caption = segment
      }
    }

    return { caption, maxHeight }
  }

  let index = 0

  while (index < lines.length) {
    const current = lines[index]?.trim() ?? ''

    if (!current) {
      index += 1
      continue
    }

    if (current.startsWith('## ')) {
      blocks.push({ type: 'h2', text: current.replace(/^##\s+/, '').trim() })
      index += 1
      continue
    }

    if (current.startsWith('### ')) {
      blocks.push({ type: 'h3', text: current.replace(/^###\s+/, '').trim() })
      index += 1
      continue
    }

    if (current.startsWith('> ')) {
      const quoteLines: Array<string> = []

      while (index < lines.length) {
        const line = (lines[index] ?? '').trim()
        if (!line.startsWith('> ')) break
        quoteLines.push(line.replace(/^>\s+/, '').trim())
        index += 1
      }

      blocks.push({ type: 'quote', text: quoteLines.join(' ') })
      continue
    }

    if (current.startsWith('- ')) {
      const items: Array<string> = []

      while (index < lines.length) {
        const line = (lines[index] ?? '').trim()
        if (!line.startsWith('- ')) break
        items.push(line.replace(/^-\s+/, '').trim())
        index += 1
      }

      blocks.push({ type: 'ul', items })
      continue
    }

    if (/^\d+\.\s+/.test(current)) {
      const items: Array<string> = []

      while (index < lines.length) {
        const line = (lines[index] ?? '').trim()
        if (!/^\d+\.\s+/.test(line)) break
        items.push(line.replace(/^\d+\.\s+/, '').trim())
        index += 1
      }

      blocks.push({ type: 'ol', items })
      continue
    }

    if (current === '&nbsp;') {
      blocks.push({ type: 'spacer' })
      index += 1
      continue
    }

    const imageMatch = current.match(imagePattern)

    if (imageMatch) {
      const [, alt, src, title] = imageMatch
      const { caption, maxHeight } = parseImageTitle(title)

      blocks.push({
        type: 'image',
        src: src.trim(),
        alt: alt.trim(),
        caption,
        maxHeight,
      })
      index += 1
      continue
    }

    const paragraphLines: Array<string> = []

    while (index < lines.length) {
      const line = (lines[index] ?? '').trim()

      if (
        !line ||
        line.startsWith('## ') ||
        line.startsWith('### ') ||
        line.startsWith('> ') ||
        line.startsWith('- ') ||
        /^\d+\.\s+/.test(line) ||
        line === '&nbsp;' ||
        imagePattern.test(line)
      ) {
        break
      }

      paragraphLines.push(line)
      index += 1
    }

    blocks.push({ type: 'paragraph', text: paragraphLines.join('\n') })
  }

  return blocks
}

function parseReadTimeMinutes(readTime: string) {
  const match = readTime.match(/\d+/)

  if (!match) {
    return 5
  }

  const value = Number.parseInt(match[0], 10)
  return Number.isNaN(value) ? 5 : value
}

function parseArticleIdentity(filePath: string): { slug: string; locale: Locale } {
  const basename = filePath.split('/').pop()?.replace(/\.md$/, '') ?? 'untitled'
  const match = basename.match(/^(.*)\.(en|es)$/)

  if (match) {
    return {
      slug: match[1],
      locale: match[2] as Locale,
    }
  }

  return {
    slug: basename,
    locale: defaultLocale,
  }
}

function resolveArticleTranslation(record: ArticleRecord, locale: Locale) {
  const localized = record.translations[locale]

  if (localized) {
    return localized
  }

  const english = record.translations[defaultLocale]

  if (english) {
    return english
  }

  for (const candidateLocale of supportedLocales) {
    const candidate = record.translations[candidateLocale]

    if (candidate) {
      return candidate
    }
  }

  return undefined
}

function getSortTime(record: ArticleRecord) {
  const article = resolveArticleTranslation(record, defaultLocale)

  if (!article) {
    return 0
  }

  return new Date(article.publishedAt).getTime()
}

function takeArticles(primary: Array<Article>, fallback: Array<Article>, limit: number) {
  const selected: Array<Article> = []
  const seen = new Set<string>()

  for (const article of [...primary, ...fallback]) {
    if (seen.has(article.slug)) continue

    selected.push(article)
    seen.add(article.slug)

    if (selected.length === limit) {
      break
    }
  }

  return selected
}

const articleRecordMap = new Map<string, ArticleRecord>()
const legacyArticleSlugMap: Record<string, string> = {
  'one-year-inside-a-founding-team': 'two-leaps-into-the-unknown',
}

for (const [filePath, raw] of Object.entries(articleFiles)) {
  const { slug, locale } = parseArticleIdentity(filePath)
  const { meta, body } = parseFrontmatter(raw)
  const article: Article = {
    slug,
    locale,
    publishedAt: meta.date,
    readTimeMinutes: parseReadTimeMinutes(meta.readTime),
    title: meta.title,
    excerpt: meta.excerpt,
    coverImage: meta.coverImage,
    coverAlt: meta.coverAlt,
    ogImage: meta.ogImage,
    ogImageAlt: meta.ogImageAlt,
    pinned: meta.pinned,
    published: meta.published,
    blocks: parseMarkdownBlocks(body),
  }

  const existing = articleRecordMap.get(slug)

  if (existing) {
    existing.translations[locale] = article
    continue
  }

  articleRecordMap.set(slug, {
    slug,
    translations: {
      [locale]: article,
    },
  })
}

const articleRecords = Array.from(articleRecordMap.values()).sort(
  (left, right) => getSortTime(right) - getSortTime(left),
)

export function hasArticle(slug: string) {
  const record = articleRecordMap.get(slug)

  if (!record) {
    return false
  }

  return supportedLocales.some((locale) => record.translations[locale]?.published === true)
}

export function getArticleSlugRedirect(slug: string) {
  return legacyArticleSlugMap[slug]
}

export function hasArticleTranslation(slug: string, locale: Locale) {
  return articleRecordMap.get(slug)?.translations[locale]?.published === true
}

export function getArticles(locale: Locale) {
  return articleRecords
    .map((record) => resolveArticleTranslation(record, locale))
    .filter((article): article is Article => article !== undefined && article.published)
}

export function getHomeFeaturedArticles(locale: Locale) {
  const articles = getArticles(locale)

  return takeArticles(
    articles.filter((article) => article.pinned),
    articles,
    3,
  )
}

export function getArticlePreviewArticles(locale: Locale) {
  const articles = getArticles(locale)

  return takeArticles(
    articles.filter((article) => !article.pinned),
    articles,
    4,
  )
}

export function getArticleBySlug(slug: string, locale: Locale) {
  const record = articleRecordMap.get(slug)

  if (!record) {
    return undefined
  }

  const article = resolveArticleTranslation(record, locale)

  if (!article?.published) {
    return undefined
  }

  return article
}

export function getArticleTranslationBySlug(slug: string, locale: Locale) {
  const article = articleRecordMap.get(slug)?.translations[locale]

  if (!article?.published) {
    return undefined
  }

  return article
}

export function getAvailableArticleLocales(slug: string) {
  const record = articleRecordMap.get(slug)

  if (!record) {
    return []
  }

  return supportedLocales.filter((locale) => record.translations[locale]?.published === true)
}
