import { createFileRoute } from '@tanstack/react-router'
import { ArticlesPreviewSection } from '@/components/portfolio/articles-preview-section'
import { HomeSection } from '@/components/portfolio/home-section'
import { SectionPills, type NavItem } from '@/components/portfolio/section-pills'
import { Sidebar } from '@/components/portfolio/sidebar'
import { WorkSection } from '@/components/portfolio/work-section'

export const Route = createFileRoute('/')({
  component: App,
})

const sectionNavItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Articles', href: '#articles' },
]

function App() {
  return (
    <main className="relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-16">
        <SectionPills items={sectionNavItems} className="reveal delay-1 mb-3 lg:hidden" />

        <Sidebar navItems={sectionNavItems} className="reveal delay-1" />

        <div className="space-y-14 lg:col-span-8 lg:space-y-20 xl:col-span-9">
          <div className="reveal delay-2">
            <HomeSection />
          </div>
          <div className="reveal delay-3">
            <WorkSection />
          </div>
          <div className="reveal delay-4">
            <ArticlesPreviewSection />
          </div>
        </div>
      </div>
    </main>
  )
}
