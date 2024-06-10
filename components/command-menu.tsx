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
import {
  LaptopIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  FileTextIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

import type { PreviewResponse } from '@/lib/types'

type PostCore = {
  title: string
  slug: string
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [posts, setPosts] = useState<PostCore[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    getPosts().then((arr) => {
      setPosts(arr)
      setLoading(false)
    })
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
        className="size-8 sm:hidden"
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
            {loading ? (
              <CommandItem disabled>Loading posts...</CommandItem>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <CommandItem
                  key={'command_' + post.slug}
                  onSelect={() => runCommand(() => router.push(post.slug))}
                >
                  <FileTextIcon
                    style={{ width: '0.825rem', height: '0.825rem' }}
                    className="mr-2"
                  />
                  <span>{post.title}</span>
                </CommandItem>
              ))
            ) : (
              <CommandItem disabled>No posts found.</CommandItem>
            )}
          </CommandGroup>
          <CommandSeparator />
          {/* Theme */}
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon style={{ width: '0.825rem', height: '0.825rem' }} className="mr-2" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon style={{ width: '0.825rem', height: '0.825rem' }} className="mr-2" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon style={{ width: '0.825rem', height: '0.825rem' }} className="mr-2" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

/**
 * Fetch and parse posts
 */
async function getPosts(): Promise<PostCore[]> {
  const res = await fetch('/api/posts', { next: { revalidate: 3600 } })
  const { posts } = (await res.json()) as PreviewResponse

  if (posts == null) return []

  return posts.map((p) => ({
    title: p.title,
    slug: '/posts/' + p.slug.full,
  }))
}
