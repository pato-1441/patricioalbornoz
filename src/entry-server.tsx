import {
  createRequestHandler,
  defaultRenderHandler,
} from '@tanstack/react-router/ssr/server'
import { createAppRouter } from './router'
import type { DocumentAssets } from './router-context'

type RenderOptions = {
  request: Request
  documentAssets: DocumentAssets
}

export async function render({ request, documentAssets }: RenderOptions) {
  const handler = createRequestHandler({
    request,
    createRouter: () =>
      createAppRouter({
        documentAssets,
      }),
  })

  return handler(defaultRenderHandler)
}
