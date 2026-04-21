export type NavItem = {
  label: string
  href: string
}

type SectionPillsProps = {
  items: Array<NavItem>
  className?: string
}

export function SectionPills({ items, className }: SectionPillsProps) {
  return (
    <menu role="tablist" className={`section-nav ${className ?? ''}`.trim()}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="section-nav-button">
            {item.label}
          </a>
        </li>
      ))}
    </menu>
  )
}
