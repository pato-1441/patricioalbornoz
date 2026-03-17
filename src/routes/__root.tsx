import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import type { AppRouterContext } from '@/router-context'
import { defaultLocale, getLocaleFromPathname } from '@/lib/locale'
import { siteName } from '@/lib/site'

const devReactRefreshPreamble = `
  import RefreshRuntime from "/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
`

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
      ...(import.meta.env.DEV
        ? [
            {
              type: 'module',
              children: devReactRefreshPreamble,
            },
          ]
        : []),
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
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
