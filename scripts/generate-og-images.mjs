import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement as h } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const contentDir = path.join(rootDir, 'src', 'content', 'articles')
const publicDir = path.join(rootDir, 'public')
const outDir = path.join(publicDir, 'og', 'articles')
const fontDir = path.join(rootDir, 'node_modules', '@fontsource', 'inter', 'files')
const defaultCoverPath = path.join(publicDir, 'og.webp')
/** Outdoor photo with clear face — matches the social-preview treatment */
const defaultAvatarPath = path.join(publicDir, 'patoalbornoz.jpg')

const siteAuthorName = 'Patricio Albornoz'
const FOOTER_BG = '#5C4E43'
const WIDTH = 1200
const HEIGHT = 630
const TOP_H = 430
const FOOTER_H = 200

function parseFrontmatter(rawFile) {
  const raw = rawFile.replace(/\r\n/g, '\n')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Article markdown is missing frontmatter block')
  }

  const [, frontmatterText] = match
  const map = new Map()

  for (const line of frontmatterText.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const separator = trimmed.indexOf(':')
    if (separator < 0) continue

    const key = trimmed.slice(0, separator).trim()
    const value = trimmed
      .slice(separator + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2')

    map.set(key, value)
  }

  return {
    title: map.get('title') ?? 'Untitled',
    coverImage: map.get('coverImage') || '',
    published: map.get('published')?.toLowerCase() === 'true',
    ogImage: map.get('ogImage') || '',
  }
}

function parseArticleIdentity(filename) {
  const basename = filename.replace(/\.md$/, '')
  const m = basename.match(/^(.*)\.(en|es)$/)

  if (m) {
    return { slug: m[1], locale: m[2] }
  }

  return { slug: basename, locale: 'en' }
}

function toDataUrl(buffer) {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

function loadImageDataUrl(absolutePath) {
  if (!fs.existsSync(absolutePath)) {
    return null
  }
  const buffer = fs.readFileSync(absolutePath)
  const ext = path.extname(absolutePath).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') {
    return `data:image/jpeg;base64,${buffer.toString('base64')}`
  }
  if (ext === '.png') {
    return toDataUrl(buffer)
  }
  if (ext === '.webp') {
    return `data:image/webp;base64,${buffer.toString('base64')}`
  }
  if (ext === '.gif') {
    return `data:image/gif;base64,${buffer.toString('base64')}`
  }
  return toDataUrl(buffer)
}

function resolveCoverDataUrl(coverPath) {
  if (coverPath && coverPath.startsWith('/')) {
    const p = path.join(publicDir, coverPath.replace(/^\//, ''))
    const data = loadImageDataUrl(p)
    if (data) {
      return data
    }
  }
  return loadImageDataUrl(defaultCoverPath) ?? toDataUrl(fs.readFileSync(defaultAvatarPath))
}

function truncateTitle(title, max = 120) {
  if (title.length <= max) {
    return title
  }
  return `${title.slice(0, max - 1)}…`
}

function titleFontSize(title) {
  const len = title.length
  if (len > 110) {
    return 24
  }
  if (len > 75) {
    return 28
  }
  if (len > 50) {
    return 32
  }
  return 36
}

function loadInterFonts() {
  const read = (name) => {
    const p = path.join(fontDir, name)
    return fs.readFileSync(p)
  }
  // Satori uses opentype.js — WOFF2 (wOF2) is not supported; use WOFF.
  return [
    { name: 'Inter', data: read('inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Inter', data: read('inter-latin-500-normal.woff'), weight: 500, style: 'normal' },
    { name: 'Inter', data: read('inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
    { name: 'Inter', data: read('inter-latin-700-normal.woff'), weight: 700, style: 'normal' },
  ]
}

function buildOgElement({ coverDataUrl, avatarDataUrl, title }) {
  const displayTitle = truncateTitle(title)

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: '#0f0f0f',
        borderRadius: 24,
        overflow: 'hidden',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: WIDTH,
          height: TOP_H,
          position: 'relative',
        },
      },
      h('img', {
        src: coverDataUrl,
        width: WIDTH,
        height: TOP_H,
        style: {
          width: WIDTH,
          height: TOP_H,
          objectFit: 'cover',
        },
      }),
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: WIDTH,
          height: FOOTER_H,
          backgroundColor: FOOTER_BG,
          padding: '0 40px',
          boxSizing: 'border-box',
        },
      },
      h('img', {
        src: avatarDataUrl,
        width: 88,
        height: 88,
        style: {
          width: 88,
          height: 88,
          borderRadius: 9999,
          border: '3px solid #ffffff',
          objectFit: 'cover',
        },
      }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 28,
            flex: 1,
            minWidth: 0,
            justifyContent: 'center',
          },
        },
        h(
          'div',
          {
            style: {
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 500,
              fontFamily: 'Inter',
              marginBottom: 10,
            },
          },
          siteAuthorName,
        ),
        h(
          'div',
          {
            style: {
              color: '#ffffff',
              fontSize: titleFontSize(displayTitle),
              fontWeight: 700,
              lineHeight: 1.2,
              fontFamily: 'Inter',
            },
          },
          displayTitle,
        ),
      ),
    ),
  )
}

async function renderPng(jsx) {
  const fonts = loadInterFonts()
  const svg = await satori(jsx, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })
  const image = resvg.render()
  return image.asPng()
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))
  const avatarData = loadImageDataUrl(defaultAvatarPath) ?? ''

  if (!avatarData) {
    console.error('Missing avatar at', defaultAvatarPath)
    process.exit(1)
  }

  let count = 0
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(contentDir, filename), 'utf8')
    const meta = parseFrontmatter(raw)

    if (!meta.published) {
      continue
    }

    if (meta.ogImage) {
      continue
    }

    const { slug, locale } = parseArticleIdentity(filename)
    const coverData = resolveCoverDataUrl(meta.coverImage)
    if (!coverData) {
      console.warn(`Skip ${filename}: no cover image`)
      continue
    }

    const png = await renderPng(
      buildOgElement({
        coverDataUrl: coverData,
        avatarDataUrl: avatarData,
        title: meta.title,
      }),
    )

    const outName = `${slug}-${locale}.png`
    const outPath = path.join(outDir, outName)
    fs.writeFileSync(outPath, png)
    console.log(`Wrote /og/articles/${outName}`)
    count += 1
  }

  console.log(`Done. ${count} Open Graph image(s) generated.`)
}

await main()
