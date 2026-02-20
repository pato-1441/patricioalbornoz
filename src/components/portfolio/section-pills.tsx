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
    <div
      className={`flex items-center gap-2 overflow-auto rounded-full border border-neutral-800/80 bg-black/60 px-2 py-2 backdrop-blur-md ${className ?? ''}`}
    >
      {items.map((item) => (
        <a key={item.href} href={item.href} className="nav-pill">
          {item.label}
        </a>
      ))}
    </div>
  )
}
