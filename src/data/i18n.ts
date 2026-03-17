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
    comingSoonTitle: string
    comingSoonDescription: string
  }
  articleContent: {
    endOfArticle: string
    thanks: string
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
    },
    sidebar: {
      role: 'Doer',
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
      archiveLabel: 'More soon',
      archiveTitle: 'More articles are on the way.',
      archiveDescription:
        "For now, this is the one to read first. I'll be publishing more writing here soon.",
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
      comingSoonTitle: 'More articles are coming soon.',
      comingSoonDescription:
        "For now, this is the only published piece in the archive. More writing will land here over time.",
    },
    articleContent: {
      endOfArticle: 'End of article',
      thanks: 'Thanks for reading. You made it to the end!',
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
    },
    sidebar: {
      role: 'Doer',
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
      archiveLabel: 'Próximamente',
      archiveTitle: 'Van a venir más artículos.',
      archiveDescription:
        'Por ahora, este es el texto que quiero que leas primero. Voy a ir publicando más acá con el tiempo.',
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
      comingSoonTitle: 'Van a venir más artículos.',
      comingSoonDescription:
        'Por ahora, este es el único texto publicado en el archivo. Más escritos van a aparecer acá con el tiempo.',
    },
    articleContent: {
      endOfArticle: 'Fin del artículo',
      thanks: 'Gracias por leer. Llegaste hasta el final.',
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
