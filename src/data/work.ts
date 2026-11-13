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
    title: 'tambo. Widgets launch',
    note: 'Product launch film',
    src: '/tambo/widgets-launch.mp4',
    poster: '/tambo/widgets-cover.jpg',
    type: 'video',
  },
  {
    title: 'Autonoma Old Home',
    note: 'AI testing workspace',
    src: '/old-home.png',
    type: 'image',
  },
  {
    title: 'Send button',
    src: '/send-button-study.jpg',
    type: 'image',
    note: 'A green send-button design study',
  },
  {
    title: 'Vercel Ship 26 London',
    src: '/vercel.mov',
    type: 'video',
    note: 'Vercel Ship 2026 London Card',
    bgColor: '#000000',
  },
  {
    title: 'tambo. Landing page motion',
    note: 'Website motion study',
    src: '/tambo/landing-motion.mp4',
    poster: '/tambo/landing-motion-poster.jpg',
    type: 'video',
  },
  {
    title: 'Numbers',
    note: 'Animated number transitions',
    src: '/numbers.mp4',
    type: 'video',
    bgColor: '#E5E8F5',
  },
  {
    title: 'tambo. Landing page',
    note: 'Product interface showcase',
    src: '/tambo/ui-camera-loop.mp4',
    poster: '/tambo/ui-camera-loop-poster.jpg',
    type: 'video',
  },
  {
    title: 'Mate Live detection',
    note: 'Custom model training & live object detection',
    src: '/mate/live-detection.mp4',
    poster: '/mate/demo-poster.jpg',
    type: 'video',
    featured: true,
    bgColor: '#E9E8E0',
  },
  {
    title: 'tambo. Landing footer',
    note: 'Website design',
    src: '/tambo-landing-footer.jpg',
    type: 'image',
  },
  {
    title: 'tambo. Widgets',
    note: 'Your finances, at a glance',
    src: '/tambo/widgets-cover.jpg',
    type: 'image',
  },
  {
    title: 'tambo. Analytics',
    note: 'Spending insights & visualizations',
    src: '/showcase-analytics.mp4',
    type: 'video',
  },
  {
    title: 'tambo. Onboarding',
    note: 'First-run product experience',
    src: '/showcase-onboarding.mp4',
    type: 'video',
  },
  {
    title: 'tambo.',
    note: 'Featured at an Apple event in Buenos Aires',
    src: '/about/apple-event-apps.webp',
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
    note: 'Product motion showcase',
  },
  {
    title: 'Lemon app icon',
    src: '/lemon-3.png',
    type: 'image',
    note: 'App icon design study',
  },
  {
    title: 'Invite friends and earn USDC',
    src: '/invite-usdc.png',
    type: 'image',
    note: 'Referral flow concept',
    bgColor: '#F6F6F6',
  },
  {
    title: 'Funny buttons',
    note: 'Interaction experiments',
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
    note: 'Upgrade flow study',
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
    note: 'Visual effect study',
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
    note: 'Selection interface study',
    src: '/multiple-choice.jpeg',
    type: 'image',
  },

  {
    title: 'Sign In',
    note: 'Authentication interface',
    src: '/sign-in.jpeg',
    type: 'image',
  },
  {
    title: 'Recording',
    note: 'Recording interface',
    src: '/recording.jpeg',
    type: 'image',
  },
]
