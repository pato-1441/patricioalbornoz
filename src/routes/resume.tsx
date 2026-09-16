import { createFileRoute } from '@tanstack/react-router'

const resumeUrl = '/Patricio%20Albornoz%20Resume.pdf'

export const Route = createFileRoute('/resume')({
  head: () => ({
    meta: [{ title: 'Resume | Patricio Albornoz' }],
  }),
  component: Resume,
})

function Resume() {
  return (
    <object
      data={resumeUrl}
      type="application/pdf"
      title="Patricio Albornoz Resume"
      className="fixed inset-0 h-full w-full"
    >
      <a href={resumeUrl} download>
        Download Patricio Albornoz’s resume (PDF)
      </a>
    </object>
  )
}
