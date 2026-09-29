import { ExternalLink } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Locale } from '@/lib/locale'
import { useLocale } from '@/context/locale-context'

type CompanyKey = 'tambo' | 'pulso' | 'autonoma' | 'melian' | 'emblue'

const companies: Record<
  CompanyKey,
  {
    name: string
    href: string
    logoSrc: string
    description: Record<Locale, string>
  }
> = {
  tambo: {
    name: 'tambo.',
    href: 'https://tambo.cc',
    logoSrc: '/tambo-logo.png',
    description: {
      es: 'Tus gastos personales, en orden. Una app para iOS y Android que funciona sin conexión, sin registro y sin conectar tu banco.',
      en: 'Your everyday expenses, organized. An app for iOS and Android that works offline, with no sign-up or bank connection.',
    },
  },
  pulso: {
    name: 'Pulso',
    href: 'https://pulso.health/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://pulso.health/&size=256',
    description: {
      es: 'Tu nutrición, tus hábitos y tus datos de salud en un solo lugar, con un plan personalizado que evoluciona con vos.',
      en: 'Your nutrition, habits, and health data in one place, with a personalized plan that evolves with you.',
    },
  },
  autonoma: {
    name: 'Autonoma',
    href: 'https://getautonoma.com/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://getautonoma.com/&size=256',
    description: {
      es: 'Agentes de IA que prueban aplicaciones web y móviles en navegadores y dispositivos reales, sin escribir scripts de testing.',
      en: 'AI agents that test web and mobile apps in real browsers and devices, without writing test scripts.',
    },
  },
  melian: {
    name: 'Melian',
    href: 'https://www.melian.com/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://melian.com/&size=256',
    description: {
      es: 'Descubrí nuevas marcas y productos seleccionados de tus tiendas favoritas, todo en un mismo lugar.',
      en: 'Discover new brands and curated products from your favorite stores, all in one place.',
    },
  },
  emblue: {
    name: 'emBlue',
    href: 'https://www.embluemail.com/',
    logoSrc: '/emblue-favicon.ico',
    description: {
      es: 'Email, SMS y WhatsApp en una plataforma para automatizar la comunicación y conectar con tus clientes.',
      en: 'Email, SMS, and WhatsApp in one platform to automate communication and connect with your customers.',
    },
  },
}

type CompanyLinkProps = {
  company: CompanyKey
  className: string
  label: string
}

export function CompanyLink({ company, className, label }: CompanyLinkProps) {
  const { locale, t } = useLocale()
  const { name, href, logoSrc, description } = companies[company]
  const preview = useRef<HTMLSpanElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const descriptionId = `company-description-${company}`
  const anchorName = `--company-${company}`

  useEffect(() => () => clearTimeout(timer.current), [])

  function showPreview() {
    clearTimeout(timer.current)
    preview.current?.showPopover()
  }

  function hidePreview() {
    clearTimeout(timer.current)
    preview.current?.hidePopover()
  }

  return (
    <span
      onPointerEnter={(event) => {
        clearTimeout(timer.current)
        if (event.pointerType === 'mouse') {
          timer.current = setTimeout(showPreview, 180)
        }
      }}
      onPointerLeave={() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          if (!preview.current?.parentElement?.matches(':focus-within')) {
            hidePreview()
          }
        }, 140)
      }}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) showPreview()
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hidePreview()
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`company-link link-underline ${className}`}
        style={{ anchorName }}
        aria-describedby={descriptionId}
      >
        <img src={logoSrc} alt="" className="company-link-logo" />
        <span>{label}</span>
      </a>

      <span
        ref={preview}
        popover="auto"
        className="company-preview"
        style={{ positionAnchor: anchorName }}
        onToggle={(event) => {
          if (event.newState === 'closed') clearTimeout(timer.current)
        }}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="company-preview-card"
          aria-label={t.projects.openProject(name)}
        >
          <span className="company-preview-header">
            <img src={logoSrc} alt="" className="company-preview-logo" />
            <span>{new URL(href).hostname.replace(/^www\./, '')}</span>
            <span className="company-preview-open">
              {locale === 'es' ? 'Abrir' : 'Open'}
              <ExternalLink size={13} aria-hidden="true" />
            </span>
          </span>
          <img
            src={`/company-${company}-preview.png`}
            alt=""
            width={1200}
            height={630}
            loading="lazy"
            className="company-preview-image"
          />
          <span className="company-preview-body">
            <strong className="company-preview-title">{name}</strong>
            <span id={descriptionId} className="company-preview-description">
              {description[locale]}
            </span>
          </span>
        </a>
      </span>
    </span>
  )
}
