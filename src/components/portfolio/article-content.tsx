import type { ReactNode } from 'react'
import { Smile } from 'lucide-react'
import type { ArticleBlock } from '@/data/articles'

type ArticleContentProps = {
  blocks: ArticleBlock[]
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const result: ReactNode[] = []
  const pattern = /(\[[^\]]+\]\([^\)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/
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
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        result.push(
          <a
            key={`link-${key}`}
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
        <code key={`code-${key}`} className="inline-code">
          {token.slice(1, -1)}
        </code>,
      )
      key += 1
    } else if (token.startsWith('**')) {
      result.push(
        <strong key={`strong-${key}`} className="font-semibold text-neutral-900">
          {token.slice(2, -2)}
        </strong>,
      )
      key += 1
    } else if (token.startsWith('*')) {
      result.push(
        <em key={`em-${key}`} className="display-serif italic text-neutral-800">
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

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <div className="prose-flow mx-auto max-w-[42rem] space-y-6 text-[1.06rem] leading-[1.8] text-neutral-700 md:text-[1.12rem]">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'h2') {
          return (
            <h2 key={key} className="mt-12 text-4xl font-semibold leading-[0.98] tracking-tight text-neutral-900">
              {renderInlineMarkdown(block.text)}
            </h2>
          )
        }

        if (block.type === 'h3') {
          return (
            <h3 key={key} className="mt-8 text-[1.9rem] font-semibold text-neutral-900">
              {renderInlineMarkdown(block.text)}
            </h3>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={key}
              className="border-l-2 border-stone-300 pl-4 display-serif text-[1.26em] italic text-neutral-700"
            >
              {renderInlineMarkdown(block.text)}
            </blockquote>
          )
        }

        if (block.type === 'ul') {
          return (
            <ul key={key} className="list-disc space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
              ))}
            </ul>
          )
        }

        if (block.type === 'ol') {
          return (
            <ol key={key} className="list-decimal space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
              ))}
            </ol>
          )
        }

        return <p key={key}>{renderInlineMarkdown(block.text)}</p>
      })}

      <footer className="end-reading-note" aria-label="End of article">
        <div className="end-reading-faces" aria-hidden>
          <Smile className="size-4" />
          <Smile className="size-4" />
        </div>
        <p className="end-reading-copy">Thanks for reading. You made it to the end!</p>
      </footer>
    </div>
  )
}
