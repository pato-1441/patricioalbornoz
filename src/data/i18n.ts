import type { Locale } from '@/lib/locale'

type LocaleCopy = {
  nav: {
    home: string
    work: string
    projects: string
    articles: string
    resume: string
    about: string
  }
  locale: {
    label: string
    auto: string
    english: string
    spanish: string
    englishName: string
    spanishName: string
  }
  profile: {
    title: string
    subtitle: string
    intro: string
    previous: string
    and: string
    photoAlt: string
    location: string
    contact: string
    copyEmail: string
    emailCopied: string
    copyError: string
    navigation: string
  }
  about: {
    title: string
    intro: string
    maker: string
    journey: string
    readStory: string
    talkAlt: string
    talkCaption: string
    galleryTitle: string
    pressLabel: string
  }
  sidebar: {
    role: string
    founded: string
    previousProductEngineering: string
    autonomousTesting: string
    frontendSearch: string
    ssrEngineering: string
    searchDetail: string
    inboxDetail: string
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
  projects: {
    title: string
    openProject: (title: string) => string
    sideProjectLabel: string
    previewLabel: string
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
    profile: {
      title: 'Product engineer.',
      subtitle: 'A maker at heart.',
      intro: 'I’m Patricio, founder of',
      previous: 'Previously at',
      and: 'and',
      photoAlt: 'Patricio Albornoz in Paris',
      location: 'Buenos Aires, Argentina',
      contact: 'Say hello',
      copyEmail: 'Copy email address',
      emailCopied: 'Email copied',
      copyError: 'Couldn’t copy. You can copy it here:',
      navigation: 'Portfolio sections',
    },
    nav: {
      home: 'Home',
      work: 'Work',
      projects: 'Projects',
      articles: 'Writing',
      resume: 'Resume',
      about: 'About me',
    },
    about: {
      title: 'A maker at heart.',
      intro:
        'I’m Pato, a product engineer based in Buenos Aires. I build products from the first idea to the small details that make them feel right. No detail is too small.',
      maker:
        'Tambo and Mate are where I follow my own questions: from making sense of everyday expenses to seeing whether a camera can count mates.',
      journey:
        'Moving to Buenos Aires and joining a founding team changed how I think about building. I wrote about that leap, the uncertainty, and what I learned along the way.',
      readStory: 'Read the story',
      talkAlt: 'Patricio sharing a presentation with a group',
      talkCaption: 'Sharing what I’m learning.',
      galleryTitle: 'A few moments along the way.',
      pressLabel: 'In the press',
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
      role: 'Product Engineer',
      founded: 'I’m Pato, founder of',
      previousProductEngineering: 'I previously built healthcare products at',
      autonomousTesting: 'Before that, I built autonomous testing agents at',
      frontendSearch: 'and helped reimagine product discovery at',
      searchDetail: ', working across frontend and search.',
      ssrEngineering: 'Earlier, I led the development of Universal Inbox at',
      inboxDetail:
        ', bringing customer conversations, WhatsApp campaigns, and CRM workflows together.',
      xLabel: 'X profile',
      githubLabel: 'GitHub profile',
      linkedinLabel: 'LinkedIn profile',
      emailLabel: 'Email Patricio',
      crafted: 'Crafted with intention in Buenos Aires.',
    },
    home: {
      title: 'Home',
      featuredLabel: 'Pinned Writing',
      pinnedArticle: 'Pinned article',
      latestArticle: 'Latest article',
      featuredFallback: 'Featured essay',
      readArticle: 'Read article',
      pinned: 'Pinned',
      recent: 'Recent',
      archiveLabel: 'Archive',
      archiveTitle: 'All published writing',
      archiveDescription: 'The complete list of essays and notes on this site.',
      openArchive: 'Open writing',
    },
    work: {
      title: 'Work',
      openItem: (title) => `Open ${title}`,
      previewItem: (title) => `${title} preview`,
      closePreview: 'Close media preview',
      close: 'Close',
    },
    projects: {
      title: 'Projects',
      openProject: (title) => `Open ${title}`,
      sideProjectLabel: 'Side project',
      previewLabel: 'Project preview',
    },
    articles: {
      title: 'Writing',
      archive: 'Archive',
      openArchive: 'Open archive',
      backToPortfolio: 'Back to portfolio section',
      backToAll: 'Back to Writing',
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
        'Portfolio of Patricio Albornoz, founder of Tambo and Product Engineer at Pulso, focused on product interfaces, frontend craft, and design systems.',
      articlesTitle: 'Writing',
      articlesDescription:
        'Essays by Patricio Albornoz on interface clarity, frontend systems, motion, and product thinking.',
    },
  },
  es: {
    profile: {
      title: 'Product engineer.',
      subtitle: 'Me gusta crear.',
      intro: 'Soy Patricio, founder de',
      previous: 'Antes en',
      and: 'y',
      photoAlt: 'Patricio Albornoz en París',
      location: 'Buenos Aires, Argentina',
      contact: 'Say hello',
      copyEmail: 'Copiar correo',
      emailCopied: 'Correo copiado',
      copyError: 'No se pudo copiar. Podés copiarlo acá:',
      navigation: 'Secciones del portfolio',
    },
    nav: {
      home: 'Inicio',
      work: 'Trabajo',
      projects: 'Proyectos',
      articles: 'Escritos',
      resume: 'CV',
      about: 'Sobre mí',
    },
    about: {
      title: 'Me gusta crear.',
      intro:
        'Soy Pato, product engineer en Buenos Aires. Construyo productos desde la primera idea hasta los pequeños detalles que hacen que se sientan bien. Ningún detalle es demasiado pequeño.',
      maker:
        'Tambo y Mate son mi forma de seguir mis propias preguntas: desde entender los gastos de todos los días hasta ver si una cámara puede contar mates.',
      journey:
        'Mudarme a Buenos Aires y sumarme a un equipo fundador cambió mi forma de pensar en lo que construyo. Escribí sobre ese salto, la incertidumbre y lo que fui aprendiendo.',
      readStory: 'Leer la historia',
      talkAlt: 'Patricio compartiendo una presentación con un grupo',
      talkCaption: 'Compartiendo lo que voy aprendiendo.',
      galleryTitle: 'Algunos momentos del camino.',
      pressLabel: 'En la prensa',
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
      role: 'Product Engineer',
      founded: 'Soy Pato, fundador de',
      previousProductEngineering: 'Antes construí productos de salud en',
      autonomousTesting: 'También desarrollé agentes autónomos de testing en',
      frontendSearch: 'y ayudé a repensar cómo descubrir productos en',
      searchDetail: ', trabajando en frontend y búsqueda.',
      ssrEngineering: 'Antes lideré el desarrollo de Universal Inbox en',
      inboxDetail:
        ', unificando conversaciones con clientes, campañas de WhatsApp y flujos de CRM.',
      xLabel: 'Perfil de X',
      githubLabel: 'Perfil de GitHub',
      linkedinLabel: 'Perfil de LinkedIn',
      emailLabel: 'Enviar email a Patricio',
      crafted: 'Hecho con intención en Buenos Aires.',
    },
    home: {
      title: 'Inicio',
      featuredLabel: 'Escritos destacados',
      pinnedArticle: 'Artículo destacado',
      latestArticle: 'Artículo reciente',
      featuredFallback: 'Ensayo destacado',
      readArticle: 'Leer artículo',
      pinned: 'Destacado',
      recent: 'Reciente',
      archiveLabel: 'Archivo',
      archiveTitle: 'Todas las publicaciones',
      archiveDescription: 'Listado de ensayos y notas en un solo lugar.',
      openArchive: 'Abrir escritos',
    },
    work: {
      title: 'Trabajo',
      openItem: (title) => `Abrir ${title}`,
      previewItem: (title) => `Vista previa de ${title}`,
      closePreview: 'Cerrar vista previa',
      close: 'Cerrar',
    },
    projects: {
      title: 'Proyectos',
      openProject: (title) => `Abrir ${title}`,
      sideProjectLabel: 'Proyecto side',
      previewLabel: 'Vista previa del proyecto',
    },
    articles: {
      title: 'Escritos',
      archive: 'Archivo',
      openArchive: 'Abrir archivo',
      backToPortfolio: 'Volver al portfolio',
      backToAll: 'Volver a Escritos',
      byAuthor: 'Por',
      featured: 'Destacado',
      article: 'Artículo',
      readingProgress: 'Progreso de lectura',
    },
    articleContent: {
      endOfArticle: 'Fin del artículo',
      thanks: 'Gracias por leer.',
      readNext: 'Seguí con',
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
        'Portfolio de Patricio Albornoz, founder de Tambo y Product Engineer en Pulso, sobre interfaces de producto, frontend craft y design systems.',
      articlesTitle: 'Escritos',
      articlesDescription:
        'Ensayos de Patricio Albornoz sobre claridad de interfaz, sistemas frontend, motion y producto.',
    },
  },
}
