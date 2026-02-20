import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/articles')({
  component: ArticlesLayout,
})

function ArticlesLayout() {
  return <Outlet />
}
