import { useState } from 'react'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { getProjects } from '@/data/projects'
import { getArticles } from '@/data/articles'
import { formatArticleDate } from '@/lib/locale'

const directions = ['quiet', 'editorial', 'studio'] as const
type Direction = (typeof directions)[number]
const descriptions: Record<Direction, string> = {
  quiet: 'A personal page. Calm type, compact projects, room to breathe.',
  editorial: 'A working journal. Expressive type and a clear reading rhythm.',
  studio: 'A visual portfolio. Bold scale and room for the work to speak.',
}

export function StylePreview() {
  const [direction, setDirection] = useState<Direction>(() => {
    const value = new URLSearchParams(window.location.search).get('style')
    return directions.find((item) => item === value) ?? 'quiet'
  })
  const projects = getProjects('en')
  const articles = getArticles('en')

  function select(next: Direction) {
    setDirection(next)
    const url = new URL(window.location.href)
    url.searchParams.set('style', next)
    window.history.replaceState(null, '', url)
  }

  return (
    <div className={`study study-${direction}`}>
      <a className="skip-link" href="#study-content">
        Skip to content
      </a>
      <div className="study-page">
        <header className="masthead">
          <a className="wordmark" href="/en">
            PA<span>Patricio Albornoz</span>
          </a>
          <nav aria-label="Portfolio">
            <a href="#selected-work">Work</a>
            <a href="#writing">Writing</a>
            <a href="mailto:pwalbornoz@gmail.com">
              Let’s talk <ArrowUpRightIcon size={14} />
            </a>
          </nav>
        </header>

        <main id="study-content">
          <section className="intro" aria-labelledby="intro-title">
            <div className="intro-copy">
              <p className="eyebrow">Product engineer · Buenos Aires</p>
              <h1 id="intro-title">
                Patricio
                <br className="name-break" /> Albornoz
                <span className="name-period">.</span>
              </h1>
              <p className="intro-statement">
                Thoughtful products. <br />
                Made from idea to detail.
              </p>
              <p className="intro-description">
                I’m Pato. I design and build software, from the first sketch to
                the little interactions that make it feel right.
              </p>
              <div className="intro-actions">
                <a className="contact-link" href="mailto:pwalbornoz@gmail.com">
                  Say hello <ArrowUpRightIcon size={16} />
                </a>
                <a
                  href="/patricio-albornoz-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Résumé <ArrowUpRightIcon size={14} />
                </a>
              </div>
            </div>
            <figure className="portrait">
              <img
                src="/patricio-paris.webp"
                alt="Patricio in Paris"
                width="500"
                height="500"
              />
              <figcaption>A little curiosity goes a long way.</figcaption>
            </figure>
          </section>

          <div className="experience">
            <p>
              Currently building{' '}
              <a href="https://tambo.cc">
                <img src="/tambo-logo.png" alt="" />
                tambo.
              </a>
            </p>
            <p>
              Previously <a href="https://pulso.health/">Pulso</a>
              <span>·</span>
              <a href="https://www.linkedin.com/company/autonoma-ai/">
                <img src="/autonoma-logo.png" alt="" />
                Autonoma
              </a>
              <span>·</span>
              <a href="https://www.melian.com/">Sirvana</a>
              <span>·</span>
              <a href="https://www.embluemail.com/">emBlue</a>
            </p>
          </div>

          <section
            className="selected-work"
            id="selected-work"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <h2 id="work-title">
                Selected work<span>01 — 03</span>
              </h2>
              <a href="/en#work">
                All explorations <ArrowUpRightIcon size={14} />
              </a>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <a
                  className={`project project-${project.id}`}
                  href={project.url}
                  key={project.id}
                >
                  <div className="project-image">
                    <img
                      src={project.preview.src}
                      alt={project.preview.alt}
                      loading="lazy"
                    />
                  </div>
                  <div className="project-copy">
                    <span className="project-number">0{index + 1}</span>
                    <div>
                      <p className="project-tag">{project.tag}</p>
                      <h3>{project.title}</h3>
                      <p className="project-description">
                        {project.description}
                      </p>
                    </div>
                    <ArrowUpRightIcon
                      className="project-arrow"
                      size={20}
                      aria-hidden="true"
                    />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section
            className="writing"
            id="writing"
            aria-labelledby="writing-title"
          >
            <div className="section-heading">
              <h2 id="writing-title">Notes & thoughts</h2>
              <span>From the process</span>
            </div>
            {articles.map((article) => (
              <a
                className="writing-row"
                href={`/en/articles/${article.slug}`}
                key={article.slug}
              >
                <span className="writing-date">
                  {formatArticleDate(article.publishedAt, 'en')}
                </span>
                <h3>{article.title}</h3>
                <ArrowUpRightIcon size={17} aria-hidden="true" />
              </a>
            ))}
          </section>
        </main>
        <footer className="study-footer">
          <p>
            Built with intention.
            <br />
            <span>Buenos Aires, Argentina</span>
          </p>
          <div>
            <a href="https://github.com/pato-1441">
              GitHub <ArrowUpRightIcon size={13} />
            </a>
            <a href="https://x.com/patoalbornozz">
              X <ArrowUpRightIcon size={13} />
            </a>
            <a href="/en">
              Current portfolio <ArrowUpRightIcon size={13} />
            </a>
          </div>
        </footer>
      </div>
      <aside className="style-picker" aria-label="Compare portfolio styles">
        <div
          className="style-options"
          role="group"
          aria-label="Style direction"
        >
          {directions.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={item === direction}
              onClick={() => select(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p role="status">{descriptions[direction]}</p>
      </aside>
    </div>
  )
}
