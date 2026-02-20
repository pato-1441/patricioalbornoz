import type { LucideIcon } from 'lucide-react'
import { AppWindow, BookOpenText } from 'lucide-react'

export type WorkHighlight = {
  title: string
  description: string
  tags: string[]
  href: string
  icon: LucideIcon
}

export type XScreenshot = {
  title: string
  caption: string
  href: string
  image: string
}

export const workHighlights: WorkHighlight[] = [
  {
    title: 'Vercel',
    description:
      'Building core product surfaces across deployment workflows, observability, and design-system primitives.',
    tags: ['React', 'Design Systems'],
    href: 'https://vercel.com',
    icon: AppWindow,
  },
  {
    title: 'Stripe',
    description:
      'Designed and shipped onboarding and payments experiences focused on clarity, conversion, and motion.',
    tags: ['Product Design', 'Frontend'],
    href: 'https://stripe.com',
    icon: BookOpenText,
  },
]

export const xScreenshots: XScreenshot[] = [
  {
    title: 'Profile Snapshot',
    caption: 'Overview, featured work, and latest updates.',
    href: 'https://x.com/patoalbornozz',
    image:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fx.com%2Fpatoalbornozz?w=1600',
  },
  {
    title: 'Replies View',
    caption: 'Conversation threads and product takes.',
    href: 'https://x.com/patoalbornozz/with_replies',
    image:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fx.com%2Fpatoalbornozz%2Fwith_replies?w=1600',
  },
  {
    title: 'Media View',
    caption: 'Visual posts, demos, and experiments.',
    href: 'https://x.com/patoalbornozz/media',
    image:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fx.com%2Fpatoalbornozz%2Fmedia?w=1600',
  },
]
