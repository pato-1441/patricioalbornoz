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
    communities: string
    earlyWork: string
    interests: string
    outsideWork: string
    journey: string
    readStory: string
    portraitAlt: string
    galleryTitle: string
    pressLabel: string
  }
  sidebar: {
    role: string
    founded: string
    previousProductEngineering: string
    autonomousTesting: string
    autonomousTestingDetail: string
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
    linkCopied: string
    copyError: string
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
      subtitle: 'A maker driven by curiosity.',
      intro: 'I’m Patricio, founder of',
      previous: 'Previously at',
      and: 'and',
      photoAlt: 'Patricio Albornoz in Paris',
      location: 'Buenos Aires, Argentina',
      contact: 'Contact me',
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
      title: 'A maker driven by curiosity.',
      intro:
        'People call me Pato or Colo, and sometimes Ducky too. I’m from Paraná, Entre Ríos, and currently live in Buenos Aires.',
      maker:
        'My first business, at 13, was importing fidget spinners from China. I discovered them after seeing the pros use them during the 2016 CS:GO world championship.',
      communities:
        'As a teenager, I was part of large Counter-Strike communities and on the staff of one of Argentina’s biggest GTA V roleplay servers.',
      earlyWork:
        'Before getting into tech, I worked as a freelance graphic designer. During the pandemic, I was a streamer and even went on to partner with Twitch.',
      interests:
        'I’m fascinated by cinema and visual effects. I’m a big fan of VFX breakdowns (shout out to',
      outsideWork:
        'I did theater and I’m generally a very social person. When I’m not building something, I’m running with friends, going out to eat and reviewing places, traveling, and talking to strangers.',
      journey:
        'I wrote a little about moving to Buenos Aires: the leap, the uncertainty, and what I learned along the way.',
      readStory: 'Read the story',
      portraitAlt: 'Patricio smiling at a table',
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
      previousProductEngineering:
        'I previously worked as a product engineer building healthcare products at',
      autonomousTesting: 'I also developed autonomous testing agents at',
      autonomousTestingDetail: ' as their first engineering hire.',
      frontendSearch:
        'I helped bring all of Argentina’s stores together in one place at',
      searchDetail: ', as a founding engineer.',
      ssrEngineering: 'Earlier, I worked on the development of Universal Inbox at',
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
      linkCopied: 'Link copied. Ready to share.',
      copyError: 'Couldn’t copy the link. Please try again.',
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
        'Portfolio of Patricio Albornoz, founder of tambo. and Product Engineer at Pulso, focused on product interfaces, frontend craft, and design systems.',
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
      contact: 'Escribime',
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
      title: 'Un creador impulsado por la curiosidad.',
      intro:
        'Me dicen Pato o Colo, y en algunos casos me han llamado Ducky también. Soy de Paraná, Entre Ríos, y actualmente vivo en Buenos Aires.',
      maker:
        'Mi primer negocio fue a los 13 años, importando fidget spinners desde China, que descubrí luego de ver que los pros los usaban durante el mundial de CS:GO de 2016.',
      communities:
        'Durante mi adolescencia formé parte de grandes comunidades de Counter-Strike, así como también formé parte del staff de uno de los servidores de roleplay de GTA V más grandes de Argentina.',
      earlyWork:
        'Antes de meterme en tecnología, trabajé como diseñador gráfico de forma freelance. Durante la pandemia fui streamer y hasta llegué a asociarme con Twitch.',
      interests:
        'Me fascinan el cine y los efectos visuales. Soy muy fan de los VFX breakdowns (shout out para',
      outsideWork:
        'Hice teatro y soy una persona muy social por lo general. Si no estoy buildeando algo, estoy corriendo con amigos, saliendo a comer y reseñando, viajando y hablando con desconocidos.',
      journey:
        'Escribí un poco sobre lo que fue venirme a Buenos Aires, ese salto, la incertidumbre y lo que fui aprendiendo.',
      readStory: 'Leer la historia',
      portraitAlt: 'Patricio sonriendo en una mesa',
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
      previousProductEngineering:
        'Antes estuve como product engineer construyendo productos de salud en',
      autonomousTesting: 'También desarrollé agentes autónomos de testing en',
      autonomousTestingDetail: ' siendo el primer engineering hire.',
      frontendSearch:
        'Ayudé a recopilar todas las tiendas de Argentina en un solo lugar en',
      searchDetail: ', como founding engineer.',
      ssrEngineering: 'Antes trabajé en el desarrollo de Universal Inbox en',
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
      linkCopied: 'Enlace copiado. Listo para compartir.',
      copyError: 'No se pudo copiar el enlace. Intentá de nuevo.',
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
        'Portfolio de Patricio Albornoz, founder de tambo. y Product Engineer en Pulso, sobre interfaces de producto, frontend craft y design systems.',
      articlesTitle: 'Escritos',
      articlesDescription:
        'Ensayos de Patricio Albornoz sobre claridad de interfaz, sistemas frontend, motion y producto.',
    },
  },
}
