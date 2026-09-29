import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { WorkShowcaseItem } from '@/data/work'
import { MediaDialog } from '@/components/portfolio/media-dialog'
import { PortfolioTabs } from '@/components/portfolio/portfolio-tabs'
import { useLocale } from '@/context/locale-context'
import { defaultLocale, isLocale } from '@/lib/locale'
import { createSeoHead } from '@/lib/seo'

const tamboCopy = {
  en: {
    label: 'Founder · iOS & Android',
    title: 'A little order for your money.',
    description:
      'tambo. is a personal expense tracker for iOS and Android. No AI, subscriptions or ads. Pay once and keep all your data on your device.',
    back: 'Back to projects',
    open: 'Visit tambo.cc',
    productTitle: 'Your whole month, in one place.',
    productDescription:
      'Log an expense in seconds, add a category, a note or a receipt, and find it again by date or category. See how your spending adds up without rebuilding a spreadsheet every month.',
    productDetails:
      'Fixed expenses, installments and groups keep recurring bills and bigger plans organized. Support for pesos, dollars and euros keeps each currency clear.',
    screenshots: [
      'Find every expense: spending by category in tambo.',
      'Log it in seconds: amounts, categories and receipt attachments.',
      'Understand your money: a clear picture of your month.',
      'tambo. — one purchase, no subscriptions.',
    ],
    originTitle: 'It started with a spreadsheet.',
    origin: [
      'When I moved out on my own, I wanted to understand where my money was going. I was writing every expense in Excel, so I started using Saturday mornings to build something that fit the way I wanted to keep track.',
      'For a long time, it was just an app on my phone. When friends and people I knew began trying it, the simplicity resonated with them. They were tired of complicated finance apps and features solving problems they didn’t have. They wanted to understand their spending and get on with their lives. That response gave me the push to share it with more people.',
    ],
    photoAlt: 'Patricio sitting outside with a companion and their luggage.',
    photoCaption: 'With Sara, the (not real) star of the tambo. ad.',
    evolutionTitle: 'A little boring. On purpose.',
    evolution: [
      'The early version I shared on LinkedIn used AI to categorize expenses. As I kept using it, I realized that wasn’t what made the app useful. The small habit of writing things down helped me pay attention to my spending.',
      'I also wanted it to work the way apps used to: buy it once and use it. No recurring payments, no ads competing for your attention. Everything you record is stored locally on your device, and you can log and review expenses offline without creating an account or connecting your bank.',
    ],
    postIntro:
      'A look back at that first prototype, before tambo. became the app it is today.',
    postTitle:
      'The early tambo. prototype — a LinkedIn post by Patricio Albornoz',
    postLink: 'Read the original post on LinkedIn',
  },
  es: {
    label: 'Founder · iOS y Android',
    title: 'Un poco de orden para tu plata.',
    description:
      'tambo. es una app de gastos personales para iOS y Android. Sin IA, suscripciones ni publicidad. La comprás una vez y todos tus datos quedan en tu dispositivo.',
    back: 'Volver a proyectos',
    open: 'Visitar tambo.cc',
    productTitle: 'Todo tu mes, en un mismo lugar.',
    productDescription:
      'Anotá un gasto en segundos, sumá una categoría, una nota o un comprobante y volvé a encontrarlo por fecha o categoría. Mirá cómo se acumulan tus gastos sin tener que armar una planilla cada mes.',
    productDetails:
      'Los gastos fijos, las cuotas y los grupos te ayudan a ordenar desde las cuentas de todos los meses hasta un viaje. Podés registrar gastos en pesos, dólares y euros, manteniendo cada moneda clara.',
    screenshots: [
      'Encontrá cada gasto: gastos por categoría en tambo.',
      'Anotá en segundos: montos, categorías y comprobantes adjuntos.',
      'Entendé tu plata: una vista clara de tu mes.',
      'tambo. — una compra, sin suscripciones.',
    ],
    originTitle: 'Empezó con una planilla.',
    origin: [
      'Cuando me mudé solo, quería entender en qué se me iba la plata. Anotaba cada gasto en un Excel, así que empecé a aprovechar los sábados por la mañana para construir algo que funcionara como yo quería.',
      'Durante mucho tiempo fue una app que usaba únicamente yo. Cuando amigos y conocidos empezaron a probarla, lo que les interesó fue esa simpleza. Estaban cansados de apps de finanzas complejas y funciones que buscaban resolver problemas que no tenían. Querían entender sus gastos y seguir con su vida. Esa respuesta me dio el impulso para compartirla con más gente.',
    ],
    photoAlt:
      'Patricio sentado al aire libre con una acompañante y sus valijas.',
    photoCaption: 'Con Sara, la protagonista (no real) del spot de tambo.',
    evolutionTitle: 'Aburrida. A propósito.',
    evolution: [
      'La primera versión que compartí en LinkedIn usaba IA para categorizar gastos. Con el uso entendí que eso no era lo que hacía útil a la app. El pequeño hábito de anotar me ayudaba a prestar más atención a lo que gastaba.',
      'También quería recuperar algo de las apps de antes: la comprás una vez y la usás. Sin pagos recurrentes ni publicidad compitiendo por tu atención. Todo lo que registrás se guarda localmente en tu dispositivo, y podés anotar y consultar tus gastos sin conexión, sin crear una cuenta ni conectar el banco.',
    ],
    postIntro:
      'Una mirada a ese primer prototipo, antes de que tambo. se convirtiera en la app de hoy.',
    postTitle:
      'El primer prototipo de tambo. — publicación de Patricio Albornoz en LinkedIn',
    postLink: 'Leer la publicación original en LinkedIn',
  },
}

export const Route = createFileRoute('/$locale/projects/tambo')({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : defaultLocale
    return createSeoHead({
      title: 'tambo.',
      description: tamboCopy[locale].description,
      locale,
      path: `/${locale}/projects/tambo`,
      image: '/tambo-landing-hero.jpg',
      alternates: { en: '/en/projects/tambo', es: '/es/projects/tambo' },
    })
  },
  component: TamboPage,
})

function TamboPage() {
  const { locale, t: shared } = useLocale()
  const t = tamboCopy[locale]
  const [activeImage, setActiveImage] = useState<WorkShowcaseItem | null>(null)
  const [postLoaded, setPostLoaded] = useState(false)

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
          <header className="project-detail-header">
            <div className="project-detail-identity">
              <img src="/tambo-logo.png" alt="" width={48} height={48} />
              <span>tambo.</span>
            </div>
            <p className="project-detail-label">{t.label}</p>
            <h1>{t.title}</h1>
            <p className="project-detail-description">{t.description}</p>
            <a
              href="https://tambo.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-open"
            >
              {t.open} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </header>

          <section
            className="project-detail-section"
            aria-labelledby="tambo-introducing"
          >
            <h2 id="tambo-introducing">Introducing tambo.</h2>
            <figure>
              <video
                src="/tambo/introducing.mp4"
                poster="/tambo/introducing-poster.jpg"
                controls
                playsInline
                preload="none"
                aria-labelledby="tambo-introducing"
                width={1920}
                height={1080}
              />
            </figure>
          </section>

          <section
            className="project-detail-section"
            aria-labelledby="tambo-product"
          >
            <h2 id="tambo-product">{t.productTitle}</h2>
            <p>{t.productDescription}</p>
            <p>{t.productDetails}</p>
            <div className="project-detail-gallery tambo-screenshots">
              {t.screenshots.map((title, index) => {
                const src = `/tambo/app-store-${index + 1}-en.webp`
                return (
                  <button
                    key={src}
                    type="button"
                    aria-label={shared.work.openItem(title)}
                    onClick={() =>
                      setActiveImage({ src, title, type: 'image' })
                    }
                  >
                    <img
                      src={src}
                      alt={title}
                      width={1242}
                      height={2688}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          <section
            className="project-detail-section tambo-origin"
            aria-labelledby="tambo-origin"
          >
            <div>
              <h2 id="tambo-origin">{t.originTitle}</h2>
              {t.origin.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <figure>
              <button
                className="tambo-origin-photo"
                type="button"
                aria-label={shared.work.openItem(t.photoAlt)}
                onClick={() =>
                  setActiveImage({
                    src: '/tambo/everyday-life.webp',
                    title: t.photoAlt,
                    type: 'image',
                  })
                }
              >
                <img
                  src="/tambo/everyday-life.webp"
                  alt={t.photoAlt}
                  width={1448}
                  height={1086}
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <figcaption>{t.photoCaption}</figcaption>
            </figure>
          </section>

          <section
            className="project-detail-section"
            aria-labelledby="tambo-evolution"
          >
            <h2 id="tambo-evolution">{t.evolutionTitle}</h2>
            {t.evolution.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>{t.postIntro}</p>
            <div className="tambo-post">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7272038391330861056"
                title={t.postTitle}
                width={504}
                height={1003}
                onLoad={() => setPostLoaded(true)}
                style={{ display: postLoaded ? 'block' : 'none' }}
                allowFullScreen
              />
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7272038469722390528/"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-backlink"
              >
                {t.postLink} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </article>
      {activeImage && (
        <MediaDialog item={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </PortfolioTabs>
  )
}
