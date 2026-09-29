import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'
import { getArticles } from './articles'

test('both translations keep the full video, preview clip, and poster for the systems article', () => {
  for (const locale of ['en', 'es'] as const) {
    const articles = getArticles(locale)
    const article = articles.find(
      (item) => item.slug === 'ai-scales-output-systems-scale-quality',
    )!

    expect(article.coverVideo).toBe('/articles/autonoma-identity.mp4')
    expect(article.coverPreviewVideo).toBe(
      '/articles/autonoma-identity-preview.mp4',
    )
    expect(article.coverImage).toBe(
      '/articles/autonoma-identity-poster.jpg',
    )

    for (const asset of [
      article.coverVideo,
      article.coverPreviewVideo,
      article.coverImage,
    ]) {
      expect(existsSync(resolve('public', `.${asset}`))).toBe(true)
    }

    expect(
      articles.find((article) => article.slug === 'two-leaps-into-the-unknown')
        ?.coverImage,
    ).toBe('/two-leaps-into-the-unknown.png')
  }
})
