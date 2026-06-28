import type { Locale } from '@/lib/locale'

type LocalizedText = Record<Locale, string>

type ProjectImage = {
  src: string
  alt: LocalizedText
}

export type ProjectItem = {
  id: string
  title: string
  description: LocalizedText
  tag: LocalizedText
  url?: string
  icon: ProjectImage
  preview: ProjectImage
}

const projects: Array<ProjectItem> = [
  {
    id: 'whatsapp-privacy-blur',
    title: 'WhatsApp Privacy Blur',
    description: {
      en: 'Blur sensitive WhatsApp Web content to keep conversations private in offices, public places, and screen shares.',
      es: 'Difumina contenido sensible de WhatsApp Web para mantener tus conversaciones privadas.',
    },
    tag: {
      en: 'Chrome extension',
      es: 'Extensión de Chrome',
    },
    url: 'https://chromewebstore.google.com/detail/whatsapp-privacy-blur/bkkmgkechgpklnpaacfpkanjdnbpgige',
    icon: {
      src: '/privacy-extension-icon.png',
      alt: {
        en: 'WhatsApp Privacy Blur extension icon',
        es: 'Ícono de la extensión WhatsApp Privacy Blur',
      },
    },
    preview: {
      src: '/privacy-extension-1.png',
      alt: {
        en: 'WhatsApp Privacy Blur preview',
        es: 'Vista previa de WhatsApp Privacy Blur',
      },
    },
  },
  {
    id: 'mate',
    title: 'Mate',
    description: {
      en: 'A web app where I built custom model training and real-time object detection to measure how many mates you drink per hour.',
      es: 'Una web app donde hice entrenamiento custom de modelos y detección de objetos en tiempo real para medir cuántos mates tomás por hora.',
    },
    tag: {
      en: 'Web app',
      es: 'Aplicación web',
    },
    url: 'https://mate.patricioalbornoz.com/',
    icon: {
      src: '/mate-favicon.png',
      alt: {
        en: 'Mate app icon',
        es: 'Ícono de la app Mate',
      },
    },
    preview: {
      src: '/mate-banner.png',
      alt: {
        en: 'Mate app preview',
        es: 'Vista previa de la app Mate',
      },
    },
  },
  {
    id: 'tambo',
    title: 'Tambo',
    description: {
      en: 'An iOS app that helps users track daily expenses in a simple and consistent way.',
      es: 'Una app para iOS que ayuda a las personas a registrar gastos diarios de forma simple y constante.',
    },
    tag: {
      en: 'iOS app',
      es: 'App iOS',
    },
    icon: {
      src: '/tambo-logo.png',
      alt: {
        en: 'Tambo app logo',
        es: 'Logo de la app Tambo',
      },
    },
    preview: {
      src: '/tambo.png',
      alt: {
        en: 'Tambo iOS app preview',
        es: 'Vista previa de la app iOS Tambo',
      },
    },
  },
]

export function getProjects(locale: Locale) {
  return projects.map((project) => ({
    ...project,
    description: project.description[locale],
    tag: project.tag[locale],
    icon: {
      ...project.icon,
      alt: project.icon.alt[locale],
    },
    preview: {
      ...project.preview,
      alt: project.preview.alt[locale],
    },
  }))
}
