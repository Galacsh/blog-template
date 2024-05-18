import ThemeToggler from '@/components/ThemeToggler'
import Image from 'next/image'
import appIcon from '@/app/icon.png'

const GlobalHeader = () => {
  return (
    <header className="h-16 border-b border-black-100 dark:border-white-100 flex flex-col justify-around items-center">
      <div className="flex flex-1 w-full items-center max-w-screen-2xl">
        <nav className="flex items-center gap-8 px-4">
          <div className="flex items-center hover:opacity-50 hover:cursor-pointer">
            <Image src={appIcon} alt="App Icon" className="size-8" />
            <div className="h-4 w-[1px] bg-white dark:bg-white-300 ml-0.5" />
            <span className="font-mono font-black text-black dark:text-white px-2">
              Galacsh
            </span>
          </div>
          <ThemeToggler />
        </nav>
      </div>
    </header>
  )
}

export default GlobalHeader
