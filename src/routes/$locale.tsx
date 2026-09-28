import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { LocaleProvider } from '@/context/locale-context'
import {
  PortfolioFooter,
  PortfolioIntro,
} from '@/components/portfolio/portfolio-layout'
import { isLocale } from '@/lib/locale'

export const Route = createFileRoute('/$locale')({
  loader: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw notFound()
    }

    return {
      locale: params.locale,
    }
  },
  component: LocalizedLayout,
})

function LocalizedLayout() {
  const { locale } = Route.useLoaderData()

  return (
    <LocaleProvider locale={locale}>
      <div className="portfolio-shell" id="home">
        <main className="portfolio-workspace">
          <aside className="portfolio-sidebar">
            <PortfolioIntro />
            <PortfolioFooter />
          </aside>
          <Outlet />
        </main>
      </div>
    </LocaleProvider>
  )
}
