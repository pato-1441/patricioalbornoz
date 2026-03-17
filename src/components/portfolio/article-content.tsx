import { Smile } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import type { ArticleBlock } from '@/data/articles'
import { useLocale } from '@/context/locale-context'

type ArticleContentProps = {
  blocks: Array<ArticleBlock>
}

function renderInlineTokens(text: string, keyPrefix: string): Array<ReactNode> {
  const result: Array<ReactNode> = []
  const pattern = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const match = remaining.match(pattern)

    if (!match || match.index === undefined) {
      result.push(remaining)
      break
    }

    const start = match.index
    const token = match[0]

    if (start > 0) {
      result.push(remaining.slice(0, start))
    }

    if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        result.push(
          <a
            key={`${keyPrefix}-link-${key}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            {label}
          </a>,
        )
        key += 1
      } else {
        result.push(token)
      }
    } else if (token.startsWith('`')) {
      result.push(
        <code key={`${keyPrefix}-code-${key}`} className="inline-code">
          {token.slice(1, -1)}
        </code>,
      )
      key += 1
    } else if (token.startsWith('**')) {
      result.push(
        <strong key={`${keyPrefix}-strong-${key}`} className="font-semibold text-neutral-900">
          {token.slice(2, -2)}
        </strong>,
      )
      key += 1
    } else if (token.startsWith('*')) {
      result.push(
        <em key={`${keyPrefix}-em-${key}`} className="display-serif italic text-neutral-800">
          {token.slice(1, -1)}
        </em>,
      )
      key += 1
    } else {
      result.push(token)
    }

    remaining = remaining.slice(start + token.length)
  }

  return result
}

function renderInlineMarkdown(text: string): Array<ReactNode> {
  return text.split('\n').flatMap((line, lineIndex) => {
    const lineNodes = renderInlineTokens(line, `line-${lineIndex}`)

    if (lineIndex === 0) {
      return lineNodes
    }

    return [<br key={`break-${lineIndex}`} />, ...lineNodes]
  })
}

function getParagraphVariant(text: string) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const trimmed = text.trim()

  if (
    lines.length >= 3 &&
    lines.length <= 5 &&
    wordCount <= 14 &&
    lines.every((line) => line.length <= 18)
  ) {
    return 'stanza'
  }

  if (trimmed.endsWith(':') && wordCount <= 10) {
    return 'lead'
  }

  if (lines.length === 1 && wordCount <= 3 && trimmed.length <= 20) {
    return 'beat'
  }

  return 'body'
}

export function ArticleContent({ blocks }: ArticleContentProps) {
  const { t } = useLocale()

  return (
    <div className="prose-flow">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'h2') {
          return (
            <h2 key={key} className="article-subheading article-subheading-h2 display-serif">
              {renderInlineMarkdown(block.text)}
            </h2>
          )
        }

        if (block.type === 'h3') {
          return (
            <h3 key={key} className="article-subheading article-subheading-h3 display-serif">
              {renderInlineMarkdown(block.text)}
            </h3>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={key} className="article-quote">
              {renderInlineMarkdown(block.text)}
            </blockquote>
          )
        }

        if (block.type === 'image') {
          const imageStyle = {
            '--article-image-max-height': block.maxHeight ?? 'none',
          } as CSSProperties

          return (
            <figure key={key} className="article-image-block" style={imageStyle}>
              <img
                src={block.src}
                alt={block.alt}
                className="article-inline-image"
                loading="lazy"
                decoding="async"
              />
              {block.caption || block.alt ? (
                <figcaption className="article-image-caption">
                  {block.caption ?? block.alt}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        if (block.type === 'spacer') {
          return <div key={key} aria-hidden className="article-spacer" />
        }

        if (block.type === 'ul') {
          return (
            <ul key={key} className="article-body-list list-disc">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
              ))}
            </ul>
          )
        }

        if (block.type === 'ol') {
          return (
            <ol key={key} className="article-body-list list-decimal">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
              ))}
            </ol>
          )
        }

        const variant = getParagraphVariant(block.text)

        if (variant === 'stanza') {
          return (
            <p key={key} className="article-paragraph article-paragraph-stanza">
              {block.text
                .split('\n')
                .filter(Boolean)
                .map((line, lineIndex) => (
                  <span key={`${key}-line-${lineIndex}`} className="article-stanza-line">
                    {renderInlineTokens(line, `${key}-line-${lineIndex}`)}
                  </span>
                ))}
            </p>
          )
        }

        return (
          <p key={key} className={`article-paragraph article-paragraph-${variant}`}>
            {renderInlineMarkdown(block.text)}
          </p>
        )
      })}

      <footer className="end-reading-note" aria-label={t.articleContent.endOfArticle}>
        <div className="end-reading-faces" aria-hidden>
          <Smile className="size-4" />
          <Smile className="size-4" />
        </div>
        <p className="end-reading-copy">{t.articleContent.thanks}</p>
      </footer>
    </div>
  )
}
