import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/mate')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$locale/projects/mate',
      params: { locale: params.locale },
      replace: true,
    })
  },
})
