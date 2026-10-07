import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement as h } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(rootDir, 'public')
const contentDir = path.join(rootDir, 'src/content/articles')
const outDir = path.join(publicDir, 'og/articles')
const WIDTH = 1200
const HEIGHT = 630
const colors = {
  bg: '#f4ece7',
  paper: '#f9f5f2',
  text: '#142531',
  muted: '#5c656b',
}
const siteAuthorName = 'Patricio Albornoz'
const domain = 'patricioalbornoz.com'

function parseFrontmatter(rawFile) {
  const match = rawFile.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/)
  if (!match) throw new Error('Article markdown is missing frontmatter block')
  const meta = {}
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':')
    if (separator < 0) continue
    meta[line.slice(0, separator).trim()] = line
      .slice(separator + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2')
  }
  return meta
}

function loadImage(src) {
  const file = path.join(publicDir, src.replace(/^\//, ''))
  const mime = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  }[path.extname(file)]
  if (!mime) throw new Error('Unsupported OG image: ' + src)
  return 'data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64')
}

// Static TTF copies of the site's fonts, licensed under the OFL files in public/fonts.
// Satori cannot read the WOFF2 files used by the browser.
const fonts = [
  {
    name: 'Host Grotesk',
    data: fs.readFileSync(path.join(publicDir, 'fonts/host-grotesk-600.ttf')),
    weight: 600,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: fs.readFileSync(path.join(publicDir, 'fonts/inter-500.ttf')),
    weight: 500,
    style: 'normal',
  },
]
// PNG export of the current site portrait; Satori does not support WebP inputs.
const avatar = loadImage('/patricio-paris.png')

function frame(children, backgroundColor = colors.paper) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        width: WIDTH,
        height: HEIGHT,
        padding: 24,
        backgroundColor: colors.bg,
        fontFamily: 'Inter',
        fontWeight: 500,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 32,
          overflow: 'hidden',
          backgroundColor,
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 18px rgba(20,37,49,0.08)',
        },
      },
      ...children,
    ),
  )
}

function buildArticleOg(meta, locale) {
  const fontSize =
    meta.title.length > 75 ? 58 : meta.title.length > 45 ? 68 : 82
  return frame(
    [
      h('img', {
        src: loadImage(meta.coverImage || '/patricio-paris.png'),
        width: 1152,
        height: 582,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(180deg, rgba(20,37,49,0.24) 0%, rgba(20,37,49,0.02) 30%, rgba(20,37,49,0.85) 100%)',
        },
      }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            position: 'absolute',
            top: 30,
            left: 32,
            right: 32,
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '7px 18px 7px 7px',
              borderRadius: 999,
              backgroundColor: colors.paper,
              border: '1px solid white',
              boxShadow: '0 2px 6px rgba(20,37,49,0.12)',
              color: colors.text,
            },
          },
          h('img', {
            src: avatar,
            width: 42,
            height: 42,
            style: { borderRadius: 999, objectFit: 'cover' },
          }),
          h('span', { style: { fontSize: 20 } }, siteAuthorName),
        ),
        h('span', { style: { color: 'white', fontSize: 19 } }, domain),
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: 40,
            right: 40,
            bottom: 38,
          },
        },
        h(
          'span',
          {
            style: {
              fontSize: 17,
              letterSpacing: 2.5,
              color: colors.bg,
              marginBottom: 14,
            },
          },
          locale === 'es' ? 'ESCRITOS' : 'WRITING',
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: 'white',
              fontFamily: 'Host Grotesk',
              fontWeight: 600,
              fontSize,
              lineHeight: 1.02,
              letterSpacing: -2.8,
              maxWidth: 1030,
            },
          },
          meta.title,
        ),
      ),
    ],
    colors.text,
  )
}

function buildPortfolioOg() {
  return frame([
    h('img', {
      src: avatar,
      width: 472,
      height: 534,
      style: {
        position: 'absolute',
        right: 24,
        top: 24,
        borderRadius: 24,
        width: 472,
        height: 534,
        objectFit: 'cover',
      },
    }),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          left: 44,
          top: 44,
          bottom: 44,
          width: 560,
          color: colors.text,
          justifyContent: 'space-between',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignSelf: 'flex-start',
            padding: '12px 20px',
            borderRadius: 999,
            backgroundColor: colors.bg,
            border: '1px solid white',
            boxShadow: '0 2px 4px rgba(20,37,49,0.08)',
            fontSize: 21,
          },
        },
        'Product Engineer',
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Host Grotesk',
              fontWeight: 600,
              fontSize: 91,
              lineHeight: 0.98,
              letterSpacing: -4,
            },
          },
          h('span', null, 'Patricio'),
          h('span', null, 'Albornoz'),
        ),
        h(
          'span',
          { style: { fontSize: 28, color: colors.muted, marginTop: 24 } },
          'Built tambo. · #1 App Store',
        ),
      ),
      h('span', { style: { fontSize: 22, color: colors.muted } }, domain),
    ),
  ])
}

async function renderPng(element) {
  const svg = await satori(element, { width: WIDTH, height: HEIGHT, fonts })
  return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
    .render()
    .asPng()
}

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(publicDir, 'og/portfolio.png'),
  await renderPng(buildPortfolioOg()),
)
console.log('Wrote /og/portfolio.png')

for (const filename of fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith('.md'))) {
  const meta = parseFrontmatter(
    fs.readFileSync(path.join(contentDir, filename), 'utf8'),
  )
  if (meta.published !== 'true' || meta.ogImage) continue
  const basename = filename.replace(/\.md$/, '')
  const match = basename.match(/^(.*)\.(en|es)$/)
  const [slug, locale] = match ? [match[1], match[2]] : [basename, 'en']
  const outputName = slug + '-' + locale + '.png'
  fs.writeFileSync(
    path.join(outDir, outputName),
    await renderPng(buildArticleOg(meta, locale)),
  )
  console.log('Wrote /og/articles/' + outputName)
}
