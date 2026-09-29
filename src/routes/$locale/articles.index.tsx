import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/articles/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$locale',
      params: { locale: params.locale },
      hash: 'articles',
      replace: true,
    })
  },
})
