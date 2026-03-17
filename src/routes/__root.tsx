import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { siteName } from '@/lib/site'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { name: 'theme-color', content: '#f5efe5' },
      { name: 'author', content: siteName },
    ],
    links: [
      { rel: 'icon', href: '/patoalbornoz.jpg' },
      { rel: 'apple-touch-icon', href: '/patoalbornoz.jpg' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
    scripts: [
      {
        defer: true,
        src: 'https://cloud.umami.is/script.js',
        'data-website-id': '91e34171-b2bd-41d7-b0a8-7fc9f3c39d60',
      },
    ],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Scripts />
    </>
  )
}
