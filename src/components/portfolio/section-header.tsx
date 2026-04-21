import type { ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  rightContent?: ReactNode
}

export function SectionHeader({ title, rightContent }: SectionHeaderProps) {
  return (
    <div className="title-bar section-titlebar">
      <div className="title-bar-text">{title}</div>
      {rightContent ? <div className="section-titlebar-right">{rightContent}</div> : null}
    </div>
  )
}
