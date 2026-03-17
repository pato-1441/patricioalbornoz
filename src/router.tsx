import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { AppRouterContext } from './router-context'

export function createAppRouter(context: AppRouterContext) {
  return createRouter({
    routeTree,
    context,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
