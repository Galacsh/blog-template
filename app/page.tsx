import Image from 'next/image'
import Link from 'next/link'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import profile from './profile.png'
import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'
import { config } from '@/lib/config'

export default function Home() {
  return (
    <div className="w-full max-w-screen-sm mx-auto px-4 my-16">
      {/* Center */}
      <div className="w-full flex flex-col items-center justify-center gap-16">
        {/* Profile card */}
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-4',
            'w-full max-w-xs pt-2 sm:p-8 sm:pt-10 sm:max-w-[400px] rounded-xl',
            'dark:sm:bg-gradient-to-t from-background from-75% to-foreground/5',
            'sm:border border-muted'
          )}
        >
          {/* Profile image */}
          <Image
            alt="profile"
            src={profile}
            className={cn(
              'translate-y-[-0.5rem]',
              'size-28 object-cover rounded-full bg-foreground/10',
              'shadow-xl shadow-foreground/5'
            )}
          />
          {/* Personal information */}
          <div className="text-center">
            <div className="font-extrabold text-xl text-foreground mb-1">{config.author}</div>
            <div className="text-xs text-muted-foreground/75">{config.keywords}</div>
            <div className="text-xs text-muted-foreground/75">{config.contact}</div>
          </div>
          {/* About me */}
          <div className="text-center text-xs leading-normal text-muted-foreground">
            {config.about}
          </div>
          {/* Links */}
          {(config.github != null || config.linkedin != null) && (
            <div className="w-full flex flex-row items-center gap-4">
              {config.github && <ExternalLink href={config.github}>GitHub</ExternalLink>}
              {config.linkedin && <ExternalLink href={config.linkedin}>LinkedIn</ExternalLink>}
            </div>
          )}
        </div>
        {/* Search posts button */}
        <Link
          href="/posts"
          className={cn(
            'flex flex-row items-center px-4 py-2',
            'font-medium text-sm rounded-md transition-colors',
            'text-background bg-foreground shadow-sm hover:opacity-80',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
          )}
        >
          Search Posts
        </Link>
      </div>
    </div>
  )
}

type ExternalLinkProps = Readonly<{
  href: string
  children: ReactNode
}>

function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex flex-row items-center justify-center w-full py-2 gap-1',
        'font-medium text-sm rounded-md hover:bg-accent/50',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
      )}
    >
      {children}
      <ArrowTopRightIcon className="size-3" />
    </a>
  )
}
