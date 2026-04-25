import type { Locale } from '@/lib/locale'

type LocaleCopy = {
  nav: {
    home: string
    work: string
    articles: string
  }
  locale: {
    label: string
    auto: string
    english: string
    spanish: string
    englishName: string
    spanishName: string
  }
  sidebar: {
    role: string
    introLead: string
    introCurrent: string
    introCurrentTail: string
    introPrevious: string
    introPreviousLink: string
    introPreviousTail: string
    introEarlier: string
    introEarlierProduct: string
    introEarlierMiddle: string
    introEarlierCompany: string
    introEarlierTail: string
    xLabel: string
    githubLabel: string
    linkedinLabel: string
    emailLabel: string
    crafted: string
  }
  home: {
    title: string
    featuredLabel: string
    pinnedArticle: string
    latestArticle: string
    featuredFallback: string
    readArticle: string
    pinned: string
    recent: string
    archiveLabel: string
    archiveTitle: string
    archiveDescription: string
    openArchive: string
  }
  work: {
    title: string
    openItem: (title: string) => string
    previewItem: (title: string) => string
    closePreview: string
    close: string
  }
  articles: {
    title: string
    archive: string
    openArchive: string
    backToPortfolio: string
    backToAll: string
    byAuthor: string
    featured: string
    article: string
    readingProgress: string
  }
  articleContent: {
    endOfArticle: string
    thanks: string
    readNext: string
  }
  articleShare: {
    openButton: string
    title: string
    copyLink: string
    copied: string
    x: string
    instagram: string
    linkedin: string
    close: string
    thanksMessage: string
    ariaCopyLink: string
    ariaShareX: string
    ariaShareInstagram: string
    ariaShareLinkedin: string
  }
  seo: {
    homeTitle: string
    homeDescription: string
    articlesTitle: string
    articlesDescription: string
  }
}

export const copy: Record<Locale, LocaleCopy> = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      articles: 'Articles',
    },
    locale: {
      label: 'Language',
      auto: 'Auto',
      english: 'EN',
      spanish: 'ES',
      englishName: 'English',
      spanishName: 'Spanish',
    },
    sidebar: {
      role: 'Design Engineer',
      introLead: 'Currently building autonomous testing agents at',
      introCurrent: 'Autonoma',
      introCurrentTail:
        ', capable of understanding codebases, finding bugs, and maintaining tests independently.',
      introPrevious: 'Previously helped reimagine product discovery at Sirvana (now',
      introPreviousLink: 'Melian',
      introPreviousTail: ') through an AI-driven product feed.',
      introEarlier: 'Earlier led the development of',
      introEarlierProduct: 'Universal Inbox',
      introEarlierMiddle: 'at',
      introEarlierCompany: 'emBlue',
      introEarlierTail:
        ', a platform that unified customer conversations, WhatsApp campaigns, and CRM workflows.',
      xLabel: 'X profile',
      githubLabel: 'GitHub profile',
      linkedinLabel: 'LinkedIn profile',
      emailLabel: 'Email Patricio',
      crafted: 'Crafted with intention in Buenos Aires.',
    },
    home: {
      title: 'Home',
      featuredLabel: 'Pinned Articles',
      pinnedArticle: 'Pinned article',
      latestArticle: 'Latest article',
      featuredFallback: 'Featured essay',
      readArticle: 'Read article',
      pinned: 'Pinned',
      recent: 'Recent',
      archiveLabel: 'Archive',
      archiveTitle: 'All published writing',
      archiveDescription: 'The complete list of essays and notes on this site.',
      openArchive: 'Open articles',
    },
    work: {
      title: 'Work',
      openItem: (title) => `Open ${title}`,
      previewItem: (title) => `${title} preview`,
      closePreview: 'Close media preview',
      close: 'Close',
    },
    articles: {
      title: 'Articles',
      archive: 'Archive',
      openArchive: 'Open archive',
      backToPortfolio: 'Back to portfolio section',
      backToAll: 'Back to all articles',
      byAuthor: 'By',
      featured: 'Featured',
      article: 'Article',
      readingProgress: 'Reading progress',
    },
    articleContent: {
      endOfArticle: 'End of article',
      thanks: 'Thanks for reading.',
      readNext: 'Up next',
    },
    articleShare: {
      openButton: 'Share',
      title: 'Share this article',
      copyLink: 'Link',
      copied: 'Copied',
      x: 'X',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      close: 'Close',
      thanksMessage:
        'Thanks for sharing! 😁 Comments on my socials are always welcome.',
      ariaCopyLink: 'Copy article link to clipboard',
      ariaShareX: 'Share on X (Twitter)',
      ariaShareInstagram: 'Share to Instagram (or copy link)',
      ariaShareLinkedin: 'Share on LinkedIn',
    },
    seo: {
      homeTitle: 'Patricio Albornoz',
      homeDescription:
        'Portfolio of Patricio Albornoz, focused on product interfaces, frontend craft, design systems, and autonomous testing at Autonoma.',
      articlesTitle: 'Articles',
      articlesDescription:
        'Essays by Patricio Albornoz on interface clarity, frontend systems, motion, and product thinking.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      work: 'Trabajo',
      articles: 'Artículos',
    },
    locale: {
      label: 'Idioma',
      auto: 'Auto',
      english: 'EN',
      spanish: 'ES',
      englishName: 'Inglés',
      spanishName: 'Español',
    },
    sidebar: {
      role: 'Design Engineer',
      introLead: 'Actualmente construyendo agentes autónomos de testing en',
      introCurrent: 'Autonoma',
      introCurrentTail:
        ', capaces de entender codebases, encontrar bugs y mantener tests de forma independiente.',
      introPrevious: 'Antes ayudé a reimaginar el discovery de producto en Sirvana (hoy',
      introPreviousLink: 'Melian',
      introPreviousTail: ') a través de un feed impulsado por IA.',
      introEarlier: 'Antes de eso lideré el desarrollo de',
      introEarlierProduct: 'Universal Inbox',
      introEarlierMiddle: 'en',
      introEarlierCompany: 'emBlue',
      introEarlierTail:
        ', una plataforma que unificaba conversaciones con clientes, campañas de WhatsApp y flujos de CRM.',
      xLabel: 'Perfil de X',
      githubLabel: 'Perfil de GitHub',
      linkedinLabel: 'Perfil de LinkedIn',
      emailLabel: 'Enviar email a Patricio',
      crafted: 'Hecho con intención en Buenos Aires.',
    },
    home: {
      title: 'Inicio',
      featuredLabel: 'Artículos Destacados',
      pinnedArticle: 'Artículo destacado',
      latestArticle: 'Artículo reciente',
      featuredFallback: 'Ensayo destacado',
      readArticle: 'Leer artículo',
      pinned: 'Destacado',
      recent: 'Reciente',
      archiveLabel: 'Archivo',
      archiveTitle: 'Todas las publicaciones',
      archiveDescription: 'Listado de ensayos y notas en un solo lugar.',
      openArchive: 'Abrir artículos',
    },
    work: {
      title: 'Trabajo',
      openItem: (title) => `Abrir ${title}`,
      previewItem: (title) => `Vista previa de ${title}`,
      closePreview: 'Cerrar vista previa',
      close: 'Cerrar',
    },
    articles: {
      title: 'Artículos',
      archive: 'Archivo',
      openArchive: 'Abrir archivo',
      backToPortfolio: 'Volver al portfolio',
      backToAll: 'Volver a todos los artículos',
      byAuthor: 'Por',
      featured: 'Destacado',
      article: 'Artículo',
      readingProgress: 'Progreso de lectura',
    },
    articleContent: {
      endOfArticle: 'Fin del artículo',
      thanks: 'Gracias por leer.',
      readNext: 'Sigue con',
    },
    articleShare: {
      openButton: 'Compartir',
      title: 'Compartir este artículo',
      copyLink: 'Enlace',
      copied: 'Listo',
      x: 'X',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      close: 'Cerrar',
      thanksMessage:
        'Gracias por compartir 😁 Siempre son bienvenidos los comentarios en mis redes.',
      ariaCopyLink: 'Copiar enlace del artículo al portapapeles',
      ariaShareX: 'Compartir en X (Twitter)',
      ariaShareInstagram: 'Compartir en Instagram o copiar enlace',
      ariaShareLinkedin: 'Compartir en LinkedIn',
    },
    seo: {
      homeTitle: 'Patricio Albornoz',
      homeDescription:
        'Portfolio de Patricio Albornoz sobre interfaces de producto, frontend craft, design systems y testing autónomo en Autonoma.',
      articlesTitle: 'Artículos',
      articlesDescription:
        'Ensayos de Patricio Albornoz sobre claridad de interfaz, sistemas frontend, motion y producto.',
    },
  },
}
