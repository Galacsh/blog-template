import { Label } from '@/components/ui/label'

type FilterLabelProps = Readonly<{
  htmlFor?: string
  children: React.ReactNode
}>

export function FilterLabel({ htmlFor, children }: FilterLabelProps) {
  return (
    <Label htmlFor={htmlFor} className="font-bold text-xs text-foreground/60 block mb-1">
      {children}
    </Label>
  )
}
