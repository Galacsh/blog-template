import Image from 'next/image'
import Link from 'next/link'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import profile from './profile.png'
import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'

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
            <div className="font-extrabold text-xl text-foreground mb-1">{AUTHOR}</div>
            <div className="text-xs text-muted-foreground/75">{KEYWORDS}</div>
            <div className="text-xs text-muted-foreground/75">{CONTACT}</div>
          </div>
          {/* About me */}
          <div className="text-center text-xs leading-normal text-muted-foreground">{ABOUT}</div>
          {/* Links */}
          {(GITHUB != null || LINKEDIN != null) && (
            <div className="w-full flex flex-row items-center gap-4">
              {GITHUB && <ExternalLink href={GITHUB}>GitHub</ExternalLink>}
              {LINKEDIN && <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>}
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

const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR
const ABOUT = process.env.NEXT_PUBLIC_ABOUT
const CONTACT = process.env.NEXT_PUBLIC_CONTACT
const KEYWORDS = process.env.NEXT_PUBLIC_KEYWORDS
const GITHUB = process.env.NEXT_PUBLIC_GITHUB
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN
