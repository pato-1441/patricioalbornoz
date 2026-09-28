import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { MediaDialog } from '@/components/portfolio/media-dialog'
import { PortfolioTabs } from '@/components/portfolio/portfolio-tabs'
import { useLocale } from '@/context/locale-context'
import { defaultLocale, isLocale } from '@/lib/locale'
import { createSeoHead } from '@/lib/seo'

const mateCopy = {
  en: {
    label: 'Side project · Computer vision',
    title: 'How many mates is too many?',
    description:
      'A web app that uses a custom-trained model and real-time object detection to count how many mates you drink per hour.',
    open: 'Try Mate',
    back: 'Back to projects',
    live: 'From the camera to a counter.',
    liveDescription:
      'Recognizing the mate and bombilla is the starting point. The app brings those detections into a live session, with a counter, session time, and mates per hour.',
    demo: 'Live detection, session stats, and the counter in action.',
    models: 'Teaching a model to recognize mate.',
    modelsDescription:
      'The model detects two objects: the mate and the bombilla. These previews show its predictions in different settings, with bounding boxes and confidence scores.',
    captions: [
      'A mate on the desk.',
      'A mate in the studio.',
      'A mate at the football ground.',
      'A mate in front of the webcam.',
    ],
    experiment: 'Testing it in front of the camera.',
    experimentCaption: 'A camera test with the mate and bombilla.',
  },
  es: {
    label: 'Proyecto personal · Visión por computadora',
    title: '¿Cuántos mates son demasiados?',
    description:
      'Una web app que usa un modelo entrenado a medida y detección de objetos en tiempo real para contar cuántos mates tomás por hora.',
    open: 'Probar Mate',
    back: 'Volver a proyectos',
    live: 'De la cámara al contador.',
    liveDescription:
      'Reconocer el mate y la bombilla es el punto de partida. La app lleva esas detecciones a una sesión en vivo, con contador, tiempo de sesión y mates por hora.',
    demo: 'Detección en vivo, estadísticas de la sesión y el contador en acción.',
    models: 'Enseñarle a un modelo a reconocer el mate.',
    modelsDescription:
      'El modelo detecta dos objetos: el mate y la bombilla. Estas pruebas muestran sus predicciones en distintos contextos, con recuadros y niveles de confianza.',
    captions: [
      'Un mate en el escritorio.',
      'Un mate en el estudio.',
      'Un mate en la cancha.',
      'Un mate frente a la webcam.',
    ],
    experiment: 'Probándolo frente a la cámara.',
    experimentCaption: 'Una prueba de cámara con el mate y la bombilla.',
  },
}

export const Route = createFileRoute('/$locale/projects/mate')({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : defaultLocale
    return createSeoHead({
      title: 'Mate',
      description: mateCopy[locale].description,
      locale,
      path: `/${locale}/projects/mate`,
      image: '/mate-banner.png',
      alternates: { en: '/en/projects/mate', es: '/es/projects/mate' },
    })
  },
  component: MatePage,
})

function MatePage() {
  const { locale } = useLocale()
  const t = mateCopy[locale]
  const [activeImage, setActiveImage] = useState<{
    src: string
    title: string
  } | null>(null)
  return (
    <PortfolioTabs activeTab="projects">
      <article className="detail-page">
        <div className="detail-toolbar">
          <Link
            to="/$locale"
            params={{ locale }}
            hash="projects"
            className="portfolio-backlink"
          >
            <ArrowLeft size={14} aria-hidden="true" /> {t.back}
          </Link>
        </div>
        <div className="detail-surface">
          <header className="mate-header">
            <div className="mate-identity">
              <img src="/mate-favicon.png" alt="" width={48} height={48} />
              <span>Mate</span>
            </div>
            <p className="mate-label">{t.label}</p>
            <h1>{t.title}</h1>
            <p className="mate-description">{t.description}</p>
            <a
              href="https://mate.patricioalbornoz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mate-open"
            >
              {t.open} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </header>
          <section className="mate-section" aria-labelledby="mate-live">
            <h2 id="mate-live">{t.live}</h2>
            <p>{t.liveDescription}</p>
            <figure>
              <video
                src="/mate/live-detection.mp4"
                poster="/mate/demo-poster.jpg"
                controls
                muted
                playsInline
                preload="none"
                aria-label={t.demo}
                width={1918}
                height={926}
              />
              <figcaption>{t.demo}</figcaption>
            </figure>
          </section>
          <section className="mate-section" aria-labelledby="mate-models">
            <h2 id="mate-models">{t.models}</h2>
            <p>{t.modelsDescription}</p>
            <div className="mate-gallery">
              {[
                'detection-desk.jpg',
                'detection-studio.jpg',
                'detection-stadium.jpg',
                'detection-webcam.png',
              ].map((file, index) => (
                <figure key={file}>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage({
                        src: `/mate/${file}`,
                        title: t.captions[index],
                      })
                    }
                    aria-label={t.captions[index]}
                  >
                    <img
                      src={`/mate/${file}`}
                      alt={t.captions[index]}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                  <figcaption>{t.captions[index]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
          <section className="mate-section" aria-labelledby="mate-experiment">
            <h2 id="mate-experiment">{t.experiment}</h2>
            <figure>
              <video
                src="/mate/experiment.mp4"
                poster="/mate/experiment-poster.jpg"
                controls
                muted
                playsInline
                preload="none"
                aria-label={t.experimentCaption}
                width={1440}
                height={1080}
              />
              <figcaption>{t.experimentCaption}</figcaption>
            </figure>
          </section>
        </div>
      </article>
      {activeImage && (
        <MediaDialog
          item={{ ...activeImage, type: 'image' }}
          onClose={() => setActiveImage(null)}
        />
      )}
    </PortfolioTabs>
  )
}
