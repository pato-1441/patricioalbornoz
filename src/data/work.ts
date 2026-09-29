export type WorkShowcaseItem = {
  title: string
  src: string
  type: 'image' | 'video'
  note?: string
  bgColor?: string
  featured?: boolean
  poster?: string
}

export const workShowcase: Array<WorkShowcaseItem> = [
  {
    title: 'tambo. — Landing page',
    src: '/tambo-landing-hero.jpg',
    type: 'image',
  },
  {
    title: 'tambo. — Landing footer',
    src: '/tambo-landing-footer.jpg',
    type: 'image',
  },
  {
    title: 'Send button',
    src: '/send-button-study.jpg',
    type: 'image',
    note: 'A green send-button design study',
  },
  {
    title: 'Mate — Live detection',
    src: '/mate/live-detection.mp4',
    poster: '/mate/demo-poster.jpg',
    type: 'video',
    featured: true,
    bgColor: '#E9E8E0',
  },
  {
    title: 'tambo. — Analytics',
    src: '/showcase-analytics.mp4',
    type: 'video',
  },
  {
    title: 'tambo. — Onboarding',
    src: '/showcase-onboarding.mp4',
    type: 'video',
  },
  {
    title: 'tambo.',
    src: '/tambo.webp',
    type: 'image',
  },
  {
    title: 'Numbers',
    src: '/numbers.mp4',
    type: 'video',
    bgColor: '#E5E8F5',
  },
  {
    title: 'Autonoma Old Home',
    src: '/old-home.png',
    type: 'image',
  },
  {
    title: 'Lemoncash',
    src: '/lemon-2.png',
    type: 'image',
    note: 'Lemoncash product concept',
    bgColor: '#F6F6F6',
  },
  {
    title: 'Exa app showcase',
    src: '/exa-2.mov',
    type: 'video',
    note: 'Exa app showcase',
  },
  {
    title: 'Lemon app icon',
    src: '/lemon-3.png',
    type: 'image',
    note: 'Lemon app icon',
  },
  {
    title: 'Invite friends and earn USDC',
    src: '/invite-usdc.png',
    type: 'image',
    note: 'Invite friends and earn USDC',
    bgColor: '#F6F6F6',
  },
  {
    title: 'Vercel Ship 26 London',
    src: '/vercel.mov',
    type: 'video',
    note: 'Vercel Ship 2026 London Card',
    bgColor: '#000000',
  },
  {
    title: 'Funny buttons',
    src: '/experiment.mov',
    type: 'video',
    featured: true,
    bgColor: '#EAE9E5',
  },
  {
    title: 'Total spent on tambo.',
    src: '/total-spent-2.mov',
    type: 'video',
    note: 'Total spent component (tambo.)',
    bgColor: '#F6F7F6',
  },
  {
    title: 'Upgrade v0 modal',
    src: '/upgrade-v0.mov',
    type: 'video',
  },
  {
    title: 'Profile',
    src: '/profile.jpeg',
    type: 'image',
    note: 'Profile page',
    bgColor: '#EAEAEA',
  },
  {
    title: 'Autonoma Blacklight Dashboard',
    src: '/agent-tw-2.png',
    type: 'image',
    note: 'Autonoma Blacklight dashboard preview',
  },
  {
    title: 'Heatmap',
    src: '/heatmap.mov',
    type: 'video',
    bgColor: '#070707',
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
]
