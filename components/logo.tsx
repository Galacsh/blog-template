'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import appIcon from '@/app/icon.png'

export default function Logo() {
  const router = useRouter()

  return (
    <div
      className="flex flex-shrink-0 items-center hover:opacity-50 hover:cursor-pointer"
      onClick={() => router.push('/')}
    >
      <Image src={appIcon} alt="App Icon" className="size-8" />
      <div className="h-4 w-[1px] hidden dark:sm:block bg-foreground/30 ml-0.5" />
      <span className="font-mono font-black hidden sm:block text-base text-black dark:text-white px-2">
        Galacsh
      </span>
    </div>
  )
}
