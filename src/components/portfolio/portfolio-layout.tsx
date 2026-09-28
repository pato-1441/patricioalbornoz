import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CSSProperties, MouseEvent } from 'react'
import { CompanyLink } from '@/components/portfolio/company-link'
import { LanguageToggle } from '@/components/portfolio/language-toggle'
import { X } from '@/components/icons/x'
import { useLocale } from '@/context/locale-context'

const email = 'pwalbornoz@gmail.com'

export function PortfolioIntro() {
  const { t } = useLocale()
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  )
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const burstTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )
  const [hasGreeted, setHasGreeted] = useState(false)
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null)

  useEffect(
    () => () => {
      clearTimeout(copyTimer.current)
      clearTimeout(burstTimer.current)
    },
    [],
  )

  async function copyEmail(event: MouseEvent<HTMLButtonElement>) {
    setHasGreeted(true)
    const bounds = event.currentTarget.getBoundingClientRect()
    const animate =
      event.detail > 0 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    clearTimeout(copyTimer.current)
    setCopyStatus('idle')
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('copied')
      if (animate && !burstTimer.current) {
        setBurst({ x: bounds.right - 24, y: bounds.top + bounds.height / 2 })
        burstTimer.current = setTimeout(() => {
          setBurst(null)
          burstTimer.current = undefined
        }, 2400)
      }
      copyTimer.current = setTimeout(() => setCopyStatus('idle'), 2000)
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <section className="portfolio-intro" aria-labelledby="profile-title">
      <div className="profile-copy">
        <h1 id="profile-title">
          Patricio Albornoz
          <span>{t.sidebar.role}</span>
        </h1>
        <p className="profile-bio">
          {t.sidebar.founded}{' '}
          <CompanyLink company="tambo" label="Tambo" className="font-medium" />.{' '}
          {t.sidebar.previousProductEngineering}{' '}
          <CompanyLink company="pulso" label="Pulso" className="font-medium" />.
        </p>
        <p className="profile-history">
          {t.sidebar.autonomousTesting}{' '}
          <CompanyLink
            company="autonoma"
            label="Autonoma"
            className="font-medium"
          />{' '}
          {t.sidebar.frontendSearch}{' '}
          <CompanyLink
            company="melian"
            label="Sirvana"
            className="font-medium"
          />
          {t.sidebar.searchDetail}
        </p>
        <p className="profile-history">
          {t.sidebar.ssrEngineering}{' '}
          <CompanyLink
            company="emblue"
            label="emBlue"
            className="font-medium"
          />
          {t.sidebar.inboxDetail}
        </p>
      </div>
      <figure className="profile-portrait">
        <img
          src="/patricio-paris.webp"
          alt={t.profile.photoAlt}
          width={500}
          height={500}
        />
        <figcaption>
          <button
            type="button"
            className="profile-contact"
            data-greeted={hasGreeted}
            onClick={copyEmail}
            title={email}
            aria-label={`${t.profile.contact}: ${t.profile.copyEmail}`}
          >
            <span aria-live="polite">
              {copyStatus === 'copied'
                ? t.profile.emailCopied
                : `${t.profile.contact} 👋`}
            </span>
          </button>
          {copyStatus === 'error' && (
            <p className="profile-contact-error" role="alert">
              {t.profile.copyError} {email}
            </p>
          )}
        </figcaption>
      </figure>
      {burst &&
        createPortal(
          <div
            className="hello-burst"
            aria-hidden="true"
            style={
              {
                '--origin-x': `${burst.x}px`,
                '--origin-y': `${burst.y}px`,
              } as CSSProperties
            }
          >
            {Array.from({ length: 14 }, (_, index) => (
              <span
                key={index}
                style={
                  {
                    '--x': `${(((index * 7) % 13) - 6) * 32}px`,
                    '--y': `${-100 - ((index * 5) % 7) * 18}px`,
                    '--spin': `${(index % 2 ? -1 : 1) * (160 + ((index * 43) % 220))}deg`,
                    '--duration': `${1900 + (index % 4) * 120}ms`,
                    fontSize: `${18 + ((index * 11) % 30)}px`,
                  } as CSSProperties
                }
              >
                👋
              </span>
            ))}
          </div>,
          document.body,
        )}
    </section>
  )
}

export function PortfolioFooter() {
  const { t } = useLocale()

  return (
    <footer className="portfolio-footer">
      <div>
        <p>{t.sidebar.crafted}</p>
        <p>© {new Date().getFullYear()} Patricio Albornoz</p>
      </div>
      <div className="portfolio-footer-links">
        <div className="profile-utilities">
          <a
            href="/Patricio%20Albornoz%20Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="profile-resume-link"
          >
            {t.nav.resume} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <LanguageToggle />
        </div>
        <div className="portfolio-socials">
          <a
            href="https://x.com/patoalbornozz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sidebar.xLabel}
            className="icon-link"
          >
            <X />
          </a>
          <a
            href="https://github.com/pato-1441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sidebar.githubLabel}
            className="icon-link"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/patoalbornoz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sidebar.linkedinLabel}
            className="icon-link"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label={t.sidebar.emailLabel}
            className="icon-link"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
