export type WorkShowcaseItem = {
  title: string
  src: string
  type: 'image' | 'video'
  note?: string
  bgColor?: string
}

export const workShowcase: Array<WorkShowcaseItem> = [
  {
    title: 'Tambo',
    src: '/tambo.png',
    type: 'image',
    note: 'Latest Tambo product surface',
  },
  {
    title: 'Blacklight Logos',
    src: '/blacklight-logos.mov',
    type: 'video',
    note: 'Blacklight logos animation',
  },
  {
    title: 'Profile',
    src: '/profile.jpeg',
    type: 'image',
    note: 'Profile page',
  },
  {
    title: 'Heatmap',
    src: '/heatmap.mov',
    type: 'video',
    bgColor: '#000000',
  },
  {
    title: 'Session Timeout',
    src: '/session-timeout.png',
    type: 'image',
    note: 'Session timeout indicator',
  },
  {
    title: 'Switch Interaction',
    src: '/switch.mp4',
    type: 'video',
    note: 'State change interaction sample',
  },
  {
    title: 'Docs Flow',
    src: '/docs.mov',
    type: 'video',
    note: 'Documentation experience preview',
  },
  {
    title: 'Vercel Marketplace',
    src: '/vercel-mkt-3.png',
    type: 'image',
    note: 'Vercel Marketplace preview',
  },
  {
    title: 'Tooltip',
    src: '/tooltip.mov',
    type: 'video',
    note: 'Tooltip animation',
  },
  {
    title: 'Run Information',
    src: '/run-information.jpeg',
    type: 'image',
    note: 'Run dashboard details and context',
  },
  {
    title: 'Glow button',
    src: '/glow.mov',
    type: 'video',
    note: 'Glow button animation',
  },
  {
    title: 'Sidebar',
    src: '/sidebar.jpeg',
    type: 'image',
    note: 'Navigation and secondary controls',
  },
  {
    title: 'View plan',
    src: '/view-plan.mov',
    type: 'video',
    note: 'View plan preview',
  },
  {
    title: 'Review',
    src: '/review.jpeg',
    type: 'image',
  },
  {
    title: 'Multiple Choice',
    src: '/multiple-choice.jpeg',
    type: 'image',
  },
  
  {
    title: 'Sign In',
    src: '/sign-in.jpeg',
    type: 'image',
  },
  {
    title: 'Recording',
    src: '/recording.jpeg',
    type: 'image',
  },
  {
    title: 'Run Sidepanel',
    src: '/run-sidepanel.mov',
    type: 'video',
    note: 'Expanded panel walkthrough',
  },
]
