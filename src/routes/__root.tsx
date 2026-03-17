import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { AppRouterContext } from '@/router-context'
import { siteName } from '@/lib/site'

export const Route = createRootRouteWithContext<AppRouterContext>()({
  loader: ({ context }) => context.documentAssets,
  head: ({ loaderData }) => ({
    meta: [
      { name: 'theme-color', content: '#f5efe5' },
      { name: 'author', content: siteName },
    ],
    links: [
      ...(loaderData?.styles ?? []).map((href) => ({ rel: 'stylesheet', href })),
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
  scripts: ({ loaderData }) =>
    (loaderData?.scripts ?? []).map((src) => ({
      type: 'module',
      src,
    })),
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
