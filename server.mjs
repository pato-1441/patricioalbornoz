import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { promises as fs } from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = __dirname
const distClientDir = path.join(rootDir, 'dist', 'client')
const distServerEntry = path.join(rootDir, 'dist', 'server', 'entry-server.js')
const manifestPath = path.join(distClientDir, '.vite', 'manifest.json')

const isProd = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT ?? 3000)
const supportedLocales = ['en', 'es']
const localeCookieKey = 'patricioalbornoz-locale'

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function isLocale(value) {
  return supportedLocales.includes(value)
}

function readCookieLocale(cookieHeader) {
  if (!cookieHeader) {
    return null
  }

  for (const segment of cookieHeader.split(';')) {
    const [rawKey, ...rawValueParts] = segment.trim().split('=')

    if (rawKey !== localeCookieKey) {
      continue
    }

    const value = rawValueParts.join('=').trim().toLowerCase()
    return isLocale(value) ? value : null
  }

  return null
}

function detectLocaleFromLanguages(candidates) {
  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase()

    if (normalized.startsWith('es')) {
      return 'es'
    }

    if (normalized.startsWith('en')) {
      return 'en'
    }
  }

  return 'en'
}

function detectPreferredLocale({ cookieHeader, acceptLanguageHeader }) {
  const cookieLocale = readCookieLocale(cookieHeader)

  if (cookieLocale) {
    return cookieLocale
  }

  const candidates = (acceptLanguageHeader ?? '')
    .split(',')
    .map((candidate) => candidate.split(';')[0]?.trim() ?? '')
    .filter(Boolean)

  return detectLocaleFromLanguages(candidates)
}

function getLocaleFromPathname(pathname) {
  const [firstSegment] = pathname.replace(/^\/+/, '').split('/')
  return isLocale(firstSegment) ? firstSegment : null
}

function stripLocaleFromPathname(pathname) {
  const locale = getLocaleFromPathname(pathname)

  if (!locale) {
    return pathname || '/'
  }

  const strippedPathname = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '')
  return strippedPathname || '/'
}

function buildLocalizedPath(locale, pathname = '/') {
  const localizedPathname = stripLocaleFromPathname(pathname.startsWith('/') ? pathname : `/${pathname}`)
  return localizedPathname === '/' ? `/${locale}` : `/${locale}${localizedPathname}`
}

function isPageRequest(req, pathname) {
  if (!['GET', 'HEAD'].includes(req.method ?? 'GET')) {
    return false
  }

  if (pathname.startsWith('/@') || pathname.startsWith('/__vite')) {
    return false
  }

  return path.posix.extname(pathname) === ''
}

function createWebRequest(req) {
  const origin = `http://${req.headers.host ?? `localhost:${port}`}`
  const headers = new Headers()

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const candidate of value) {
        headers.append(key, candidate)
      }
      continue
    }

    if (typeof value === 'string') {
      headers.set(key, value)
    }
  }

  return new Request(new URL(req.url ?? '/', origin), {
    method: req.method,
    headers,
  })
}

async function sendWebResponse(res, response, method = 'GET') {
  res.statusCode = response.status

  response.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })

  if (method === 'HEAD') {
    res.end()
    return
  }

  const buffer = response.body ? Buffer.from(await response.arrayBuffer()) : Buffer.alloc(0)
  res.end(buffer)
}

function collectCss(entryKey, manifest, seen = new Set()) {
  if (seen.has(entryKey)) {
    return new Set()
  }

  seen.add(entryKey)

  const entry = manifest[entryKey]
  const css = new Set(entry?.css ?? [])

  for (const importedKey of entry?.imports ?? []) {
    for (const href of collectCss(importedKey, manifest, seen)) {
      css.add(href)
    }
  }

  return css
}

function readDocumentAssetsFromManifest() {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const clientEntryKey =
    (manifest['src/entry-client.tsx'] && 'src/entry-client.tsx') ||
    (manifest['index.html'] && 'index.html') ||
    Object.keys(manifest).find((key) => manifest[key]?.isEntry)
  const clientEntry = clientEntryKey ? manifest[clientEntryKey] : null

  if (!clientEntry?.file) {
    throw new Error('Could not find a client entry in the Vite manifest')
  }

  return {
    scripts: [`/${clientEntry.file}`],
    styles: Array.from(collectCss(clientEntryKey, manifest)).map((href) => `/${href}`),
  }
}

async function serveStaticFile(res, pathname) {
  const requestedPath = decodeURIComponent(pathname).replace(/^\/+/, '')
  const filePath = path.join(distClientDir, requestedPath)
  const normalizedPath = path.normalize(filePath)

  if (!normalizedPath.startsWith(distClientDir)) {
    return false
  }

  if (!existsSync(normalizedPath)) {
    return false
  }

  const stat = await fs.stat(normalizedPath)

  if (!stat.isFile()) {
    return false
  }

  const extension = path.extname(normalizedPath).toLowerCase()
  res.statusCode = 200
  res.setHeader('Content-Type', mimeTypes[extension] ?? 'application/octet-stream')
  res.setHeader('Cache-Control', extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable')
  createReadStream(normalizedPath).pipe(res)
  return true
}

let vite
let render
let documentAssets

if (isProd) {
  documentAssets = readDocumentAssetsFromManifest()
  ;({ render } = await import(pathToFileURL(distServerEntry).href))
} else {
  const { createServer } = await import('vite')
  vite = await createServer({
    root: rootDir,
    appType: 'custom',
    server: {
      middlewareMode: true,
    },
  })
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? `localhost:${port}`}`)
    const pathname = url.pathname

    if (isPageRequest(req, pathname) && !getLocaleFromPathname(pathname)) {
      const preferredLocale = detectPreferredLocale({
        cookieHeader: req.headers.cookie,
        acceptLanguageHeader: req.headers['accept-language'],
      })
      const redirectLocation = `${buildLocalizedPath(preferredLocale, pathname)}${url.search}`

      res.statusCode = 302
      res.setHeader('Location', redirectLocation)
      res.end()
      return
    }

    if (!isPageRequest(req, pathname)) {
      if (isProd) {
        const served = await serveStaticFile(res, pathname)

        if (!served) {
          res.statusCode = 404
          res.end('Not found')
        }

        return
      }

      vite.middlewares(req, res, () => {
        res.statusCode = 404
        res.end('Not found')
      })
      return
    }

    if (!isProd) {
      ;({ render } = await vite.ssrLoadModule('/src/entry-server.tsx'))
      documentAssets = {
        scripts: ['/@vite/client', '/src/entry-client.tsx'],
        styles: ['/src/styles.css'],
      }
    }

    const response = await render({
      request: createWebRequest(req),
      documentAssets,
    })

    await sendWebResponse(res, response, req.method)
  } catch (error) {
    if (!isProd && vite) {
      vite.ssrFixStacktrace(error)
    }

    console.error(error)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

server.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`)
})
