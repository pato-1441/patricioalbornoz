import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'
import { getArticles } from './articles'

test('both translations keep the full video, preview clip, and poster for the systems article', () => {
  for (const locale of ['en', 'es'] as const) {
    const articles = getArticles(locale)
    const videoArticles = articles.filter((article) => article.coverVideo)

    expect(videoArticles.map((article) => article.slug)).toEqual([
      'ai-scales-output-systems-scale-quality',
    ])
    expect(videoArticles[0].coverVideo).toBe('/articles/autonoma-identity.mp4')
    expect(videoArticles[0].coverPreviewVideo).toBe(
      '/articles/autonoma-identity-preview.mp4',
    )
    expect(videoArticles[0].coverImage).toBe(
      '/articles/autonoma-identity-poster.jpg',
    )

    for (const asset of [
      videoArticles[0].coverVideo,
      videoArticles[0].coverPreviewVideo,
      videoArticles[0].coverImage,
    ]) {
      expect(existsSync(resolve('public', `.${asset}`))).toBe(true)
    }

    expect(
      articles.find((article) => article.slug === 'two-leaps-into-the-unknown')
        ?.coverImage,
    ).toBe('/two-leaps-into-the-unknown.png')
  }
})
