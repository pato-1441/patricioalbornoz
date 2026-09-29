import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '@/context/locale-context'
import { getProjects } from '@/data/projects'

export function ProjectsSection() {
  const { locale } = useLocale()
  return (
    <section id="projects" className="projects-grid">
      {getProjects(locale).map((project) => {
        const content = (
          <>
            <div className="collection-cover">
              <img
                src={project.preview.src}
                alt={project.preview.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="collection-copy">
              <div className="project-identity">
                <img src={project.icon.src} alt="" width={36} height={36} />
                <h2>{project.title}</h2>
              </div>
              <p className="collection-description">{project.description}</p>
              <div className="collection-meta project-card-footer">
                <span>{project.tag}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </div>
          </>
        )
        return project.id === 'mate' || project.id === 'tambo' ? (
          <Link
            key={project.id}
            to={
              project.id === 'tambo'
                ? '/$locale/projects/tambo'
                : '/$locale/projects/mate'
            }
            params={{ locale }}
            className="project-card"
          >
            {content}
          </Link>
        ) : (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            {content}
          </a>
        )
      })}
    </section>
  )
}
