export function AppFooter() {
  return (
    <footer className="h-16 w-full flex flex-col items-center justify-center text-foreground/60 border-t border-border">
      <span className="text-xs leading-5">
        © {COPYRIGHT_RANGE} {AUTHOR}
      </span>
      <span className="text-xs leading-5">All rights reserved.</span>
    </footer>
  )
}

const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR
const COPYRIGHT_RANGE = process.env.NEXT_PUBLIC_COPYRIGHT_RANGE
