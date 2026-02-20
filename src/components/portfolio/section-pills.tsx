export type NavItem = {
  label: string
  href: string
}

type SectionPillsProps = {
  items: NavItem[]
  className?: string
}

export function SectionPills({ items, className }: SectionPillsProps) {
  return (
    <nav className={`section-nav flex items-center gap-5 overflow-auto ${className ?? ''}`}>
      {items.map((item) => (
        <a key={item.href} href={item.href} className="nav-pill">
          {item.label}
        </a>
      ))}
    </nav>
  )
}
