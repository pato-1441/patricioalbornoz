import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/portfolio/section-header'
import { useLocale } from '@/context/locale-context'
import { getProjects } from '@/data/projects'

export function ProjectsSection() {
  const { locale, t } = useLocale()
  const projects = getProjects(locale)

  return (
    <section id="projects" className="scroll-mt-24 space-y-7">
      <SectionHeader title={t.projects.title} />

      <div className="projects-layout">
        <div className="projects-list">
          {projects.map((project) => (
            <article key={project.id} className="project-item group">
              <div className="project-item-media">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.projects.openProject(project.title)}
                    className="project-icon-link"
                  >
                    <img
                      src={project.icon.src}
                      alt={project.icon.alt}
                      className="project-icon"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : (
                  <img
                    src={project.icon.src}
                    alt={project.icon.alt}
                    className="project-icon"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              <div className="project-item-body">
                <div className="project-item-heading">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-title-link group-hover:font-bold"
                    >
                      <h3 className="project-title">{project.title}</h3>
                      <ArrowUpRight className="size-3.5 group-hover:font-bold" />
                    </a>
                  ) : (
                    <h3 className="project-title">{project.title}</h3>
                  )}
                </div>

                <p className="project-description">{project.description}</p>

                <p className="project-pill w-fit">{project.tag}</p>
              </div>

              <figure
                className="project-preview-tooltip"
                aria-label={t.projects.previewLabel}
              >
                <img
                  src={project.preview.src}
                  alt={project.preview.alt}
                  className="project-preview-image"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
