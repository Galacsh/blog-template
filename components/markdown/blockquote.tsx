export function Blockquote({ children }: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote className="pl-[1em] text-foreground/60 border-l-4 border-l-foreground/20 mb-4">
      {children}
    </blockquote>
  )
}
