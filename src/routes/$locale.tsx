import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { LocaleProvider } from '@/context/locale-context'
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
      <Outlet />
    </LocaleProvider>
  )
}
