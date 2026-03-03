export type WorkShowcaseItem = {
  title: string
  src: string
  type: 'image' | 'video'
  note?: string
}

export const workShowcase: WorkShowcaseItem[] = [
  {
    title: 'Profile',
    src: '/profile.jpeg',
    type: 'image',
  },
  {
    title: 'Session Timeout',
    src: '/session-timeout.png',
    type: 'image',
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
    title: 'Run Information',
    src: '/run-information.jpeg',
    type: 'image',
    note: 'Run dashboard details and context',
  },
  {
    title: 'Sidebar',
    src: '/sidebar.jpeg',
    type: 'image',
    note: 'Navigation and secondary controls',
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
