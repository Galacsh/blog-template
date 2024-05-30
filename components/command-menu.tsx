'use client'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { LaptopIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (e.target instanceof HTMLElement && e.target.isContentEditable) return
        if (e.target instanceof HTMLInputElement) return
        if (e.target instanceof HTMLTextAreaElement) return
        if (e.target instanceof HTMLSelectElement) return

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          'relative h-8 w-32 lg:w-60 hidden sm:inline-flex justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none'
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search commands...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-8 bg-background sm:hidden"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="size-4" />
        <span className="sr-only">Search commands</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          {/* No results */}
          <CommandEmpty>No results found.</CommandEmpty>
          {/* Posts */}
          <CommandGroup heading="Posts">
            <CommandItem onSelect={() => runCommand(() => {})}>
              TODO: implement posts searching
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          {/* Links */}
          <CommandGroup heading="Links">
            <CommandItem onSelect={() => runCommand(() => {})}>
              TODO: use sitemap maybe?
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/'))}>Home</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/posts'))}>
              Posts
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          {/* Theme */}
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
