export type Article = {
  slug: string
  date: string
  readTime: string
  title: string
  excerpt: string
  body: string[]
}

export const articles: Article[] = [
  {
    slug: 'designing-product-surfaces-that-explain-themselves',
    date: 'Jan 12, 2026',
    readTime: '8 min read',
    title: 'Designing Product Surfaces That Explain Themselves',
    excerpt:
      'A practical system for reducing support load by making states, empty cases, and handoffs self-explanatory.',
    body: [
      'Most product friction does not come from feature gaps. It comes from unclear interfaces where users have to infer state, intent, or outcome.',
      'A strong product surface explains itself at first glance: what is happening, what can happen next, and what will happen after an action.',
      'That clarity starts with naming. Labels should describe user outcomes, not internal implementation details. If the engineering term leaks into UI, the burden shifts to the user.',
      'The second lever is state design. Empty, loading, success, and failure states should feel like a single narrative rather than disconnected screens. When those states share voice and structure, trust goes up and retries go down.',
      'The third lever is handoff quality. Any transition between product surfaces should preserve context. If users must reconstruct what they were doing after a route change or modal close, the interface has already failed them.',
      'When teams treat interface clarity as a system instead of a polishing pass, product complexity becomes manageable and support requests collapse naturally.',
    ],
  },
  {
    slug: 'shipping-motion-without-shipping-noise',
    date: 'Nov 02, 2025',
    readTime: '6 min read',
    title: 'Shipping Motion Without Shipping Noise',
    excerpt:
      'How to use animation as product communication rather than decoration.',
    body: [
      'Motion should communicate a state change. If it does not communicate anything, it is visual debt.',
      'A reliable rule is simple: animate ownership changes. When an element enters, exits, expands, or changes hierarchy, motion helps users track continuity.',
      'Timing should reflect intent. Fast transitions work for low-risk actions; slower transitions help users process structural changes.',
      'Teams often add micro-interactions before defining motion principles. That leads to inconsistency and fatigue. Instead, define a tiny motion system first and reuse it everywhere.',
      'Good motion disappears into the experience. Users remember the product feeling responsive, not the animation itself.',
    ],
  },
  {
    slug: 'the-interface-is-a-contract',
    date: 'Sep 21, 2025',
    readTime: '10 min read',
    title: 'The Interface Is a Contract',
    excerpt:
      'A framework for aligning PM, design, and engineering around predictable UI behavior.',
    body: [
      'Every interface promises behavior. Buttons, labels, and page structure become implicit contracts users rely on.',
      'Contracts break when one team optimizes for speed while another optimizes for polish without shared acceptance criteria.',
      'A practical approach is to define contract checks: response timing expectations, irreversible action safeguards, and data persistence guarantees.',
      'When these checks are explicit, design reviews become product behavior reviews. Engineering estimates become clearer because edge cases are visible earlier.',
      'Predictable interfaces are not about minimalism. They are about trust. Trust is what allows users to move quickly without hesitation.',
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}
