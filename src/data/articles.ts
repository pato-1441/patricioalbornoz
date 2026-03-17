export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: Array<string> }
  | { type: 'ol'; items: Array<string> }

export type Article = {
  slug: string
  date: string
  readTime: string
  title: string
  excerpt: string
  coverImage?: string
  coverAlt?: string
  pinned: boolean
  blocks: Array<ArticleBlock>
}

type Frontmatter = {
  title: string
  date: string
  readTime: string
  excerpt: string
  coverImage?: string
  coverAlt?: string
  pinned: boolean
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
      pinned: map.get('pinned')?.toLowerCase() === 'true',
    },
    body: body.trim(),
  }
}

function parseMarkdownBlocks(markdown: string): Array<ArticleBlock> {
  const blocks: Array<ArticleBlock> = []
  const lines = markdown.split('\n')

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

    const paragraphLines: Array<string> = []
    while (index < lines.length) {
      const line = (lines[index] ?? '').trim()

      if (
        !line ||
        line.startsWith('## ') ||
        line.startsWith('### ') ||
        line.startsWith('> ') ||
        line.startsWith('- ') ||
        /^\d+\.\s+/.test(line)
      ) {
        break
      }

      paragraphLines.push(line)
      index += 1
    }

    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') })
  }

  return blocks
}

export const articles: Array<Article> = Object.entries(articleFiles)
  .map(([filePath, raw]) => {
    const slug = filePath.split('/').pop()?.replace(/\.md$/, '') ?? 'untitled'
    const { meta, body } = parseFrontmatter(raw)

    return {
      slug,
      date: meta.date,
      readTime: meta.readTime,
      title: meta.title,
      excerpt: meta.excerpt,
      coverImage: meta.coverImage,
      coverAlt: meta.coverAlt,
      pinned: meta.pinned,
      blocks: parseMarkdownBlocks(body),
    }
  })
  .sort((a, b) => {
    const aTime = new Date(a.date).getTime()
    const bTime = new Date(b.date).getTime()
    return bTime - aTime
  })

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

export const pinnedArticles = articles.filter((article) => article.pinned)

export const homeFeaturedArticles = takeArticles(pinnedArticles, articles, 3)

export const articlePreviewArticles = takeArticles(
  articles.filter((article) => !article.pinned),
  articles,
  4,
)

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}
