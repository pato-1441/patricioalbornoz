
export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white rounded-xl px-2 py-2 border-amber-100 border ${className}`}>
      {children}
    </div>
  )
}