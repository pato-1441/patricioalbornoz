import type { ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  rightContent?: ReactNode
}

export function SectionHeader({ title, rightContent }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="section-title">{title}</h2>
      {rightContent}
    </div>
  )
}
