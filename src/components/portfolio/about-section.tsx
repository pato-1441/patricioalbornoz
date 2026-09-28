import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { WorkShowcaseItem } from '@/data/work'
import { MediaDialog } from '@/components/portfolio/media-dialog'
import { useLocale } from '@/context/locale-context'
import { formatArticleDate } from '@/lib/locale'

const press = [
  {
    source: 'El Diario',
    date: '2024-05-19',
    title: 'Soñar en grande: la IA como respuesta a las demandas sociales',
    href: 'https://web.archive.org/web/20251114081102/https://www.eldiario.com.ar/2024/05/19/sonar-en-grande-la-ia-como-respuesta-a-las-demandas-sociales/',
  },
  {
    source: 'Chajarí Digital',
    date: '2024-04-23',
    title:
      'Jóvenes paranaenses crearon un motor de búsqueda con todos los productos del país',
    href: 'https://chajarialdia.com.ar/?p=249461',
  },
  {
    source: 'El Entre Ríos',
    date: '2024-04-16',
    title:
      'Entrerrianos de punta: con menos de 20 años, desarrollaron un motor de búsqueda para tiendas online',
    href: 'https://www.elentrerios.com/actualidad/entrerrianos-de-punta-con-menos-de-20-aos-desarrollaron-un-motor-de-bsqueda-para-tiendas-online.htm',
  },
  {
    source: 'Telefe Noticias · Instagram Reel',
    date: '2024-04-13',
    title: 'Tienen 18 años y crearon una plataforma que promete en Argentina',
    href: 'https://www.instagram.com/reel/C5tTjDAO_ln/',
  },
]

const photos = [
  {
    src: '/about/mate-at-the-desk.jpg',
    width: 1279,
    height: 847,
    caption: { en: 'Mate at the desk.', es: 'Un mate en el escritorio.' },
  },
  {
    src: '/about/running.jpg',
    width: 948,
    height: 1798,
    caption: { en: 'A run in the park.', es: 'Una vuelta por el parque.' },
  },
  {
    src: '/about/editing.jpg',
    width: 1649,
    height: 1148,
    caption: { en: 'Behind the video.', es: 'Detrás del video.' },
  },
  {
    src: '/about/apple-visit.jpg',
    width: 1535,
    height: 2048,
    caption: { en: 'A visit to Apple.', es: 'De visita en Apple.' },
  },
  {
    src: '/about/together.jpg',
    width: 856,
    height: 481,
    caption: { en: 'In good company.', es: 'En buena compañía.' },
  },
  {
    src: '/about/dinner.jpg',
    width: 960,
    height: 1280,
    caption: { en: 'Around the table.', es: 'Alrededor de la mesa.' },
  },
  {
    src: '/about/office-setup.jpg',
    width: 1600,
    height: 1200,
    caption: { en: 'An office in the making.', es: 'Una oficina en proceso.' },
  },
  {
    src: '/about/building.jpg',
    width: 2487,
    height: 4160,
    caption: { en: 'Making it work.', es: 'Arreglándonos con lo que hay.' },
  },
]

export function AboutSection() {
  const { locale, t } = useLocale()
  const [activePhoto, setActivePhoto] = useState<WorkShowcaseItem | null>(null)
  const talk = {
    src: '/about/sharing-ideas.jpg',
    title: t.about.talkAlt,
    type: 'image' as const,
  }

  return (
    <section id="about" className="about-section space-y-7">
      <div className="about-layout">
        <div className="about-copy">
          <h2 className="about-title">{t.about.title}</h2>
          <p className="about-lead">{t.about.intro}</p>
          <p>{t.about.maker}</p>
          <p>{t.about.journey}</p>
          <Link
            to="/$locale/articles/$slug"
            params={{ locale, slug: 'two-leaps-into-the-unknown' }}
            className="about-story-link"
          >
            {t.about.readStory} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <figure className="about-photo about-feature-photo">
          <button
            onClick={() => setActivePhoto(talk)}
            type="button"
            aria-label={t.work.openItem(talk.title)}
          >
            <img
              src={talk.src}
              alt={talk.title}
              width={1280}
              height={959}
              loading="lazy"
            />
          </button>
          <figcaption>{t.about.talkCaption}</figcaption>
        </figure>
      </div>
      <h3 className="section-title">{t.about.pressLabel}</h3>
      <div className="about-press-grid">
        {press.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="about-press"
          >
            <span>
              <small>
                {item.source} ·{' '}
                <time dateTime={item.date}>
                  {formatArticleDate(item.date, locale)}
                </time>
              </small>
              <strong lang="es">{item.title}</strong>
            </span>
            <ArrowUpRight size={24} aria-hidden="true" />
          </a>
        ))}
      </div>
      <h3 className="section-title">{t.about.galleryTitle}</h3>
      <div className="about-gallery">
        {photos.map((photo) => (
          <figure className="about-photo" key={photo.src}>
            <button
              type="button"
              aria-label={t.work.openItem(photo.caption[locale])}
              onClick={() =>
                setActivePhoto({
                  src: photo.src,
                  title: photo.caption[locale],
                  type: 'image',
                })
              }
            >
              <img
                src={photo.src}
                alt={photo.caption[locale]}
                width={photo.width}
                height={photo.height}
                loading="lazy"
              />
            </button>
            <figcaption>{photo.caption[locale]}</figcaption>
          </figure>
        ))}
      </div>
      {activePhoto && (
        <MediaDialog item={activePhoto} onClose={() => setActivePhoto(null)} />
      )}
    </section>
  )
}
