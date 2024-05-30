'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import appIcon from '@/app/icon.png'

export default function Logo() {
  const router = useRouter()

  return (
    <div
      className="flex flex-shrink-0 items-center hover:opacity-60 hover:cursor-pointer"
      onClick={() => router.push('/')}
    >
      <Image src={appIcon} alt="App Icon" className="size-8" />
      <div className="h-4 w-[1px] invisible dark:sm:visible bg-foreground/30 sm:ml-0.5 sm:mr-2" />
      <span className="font-mono font-black hidden sm:block text-black dark:text-white">
        {AUTHOR}
      </span>
    </div>
  )
}

const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR
