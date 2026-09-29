import { ArticleCard } from '@/components/portfolio/article-card'
import { useLocale } from '@/context/locale-context'
import { getArticles } from '@/data/articles'

export function ArticlesPreviewSection() {
  const { locale } = useLocale()
  return (
    <section id="articles" className="writing-grid">
      {getArticles(locale).map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </section>
  )
}
