import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/portfolio/section-header'
import { useLocale } from '@/context/locale-context'
import { getProjects } from '@/data/projects'

export function ProjectsSection() {
  const { locale, t } = useLocale()
  const projects = getProjects(locale)

  return (
    <section id="projects" className="scroll-mt-32 space-y-8">
      <SectionHeader title={t.projects.title} />

      <div className="projects-list">
        {projects.map((project) => {
          const content = (
            <>
              <span className="project-row-main">
                <img
                  src={project.icon.src}
                  alt={project.icon.alt}
                  className="project-logo"
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-copy">
                  <span className="project-title">{project.title}</span>
                  <span className="project-description">{project.tag}</span>
                </span>
              </span>
              <ArrowUpRight className="project-arrow size-4" aria-hidden />
            </>
          )

          return project.url ? (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.projects.openProject(project.title)}
              className="project-row group"
            >
              {content}
            </a>
          ) : (
            <article key={project.id} className="project-row group">
              {content}
            </article>
          )
        })}
      </div>
    </section>
  )
}
