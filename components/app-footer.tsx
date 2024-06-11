import { config } from '@/lib/config'

export function AppFooter() {
  return (
    <footer className="h-16 w-full flex flex-col items-center justify-center text-foreground/60 border-t border-border">
      <span className="text-xs leading-5">
        © {config.copyrightRange} {config.author}
      </span>
      <span className="text-xs leading-5">All rights reserved.</span>
    </footer>
  )
}
