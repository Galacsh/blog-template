import Logo from './logo'
import Link from 'next/link'

const NavigationMenu = () => {
  return (
    <nav className="flex flex-grow items-center gap-4 sm:gap-8 px-4 w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
      {/* Logo */}
      <Logo />

      {/* Nav links */}
      <Link
        href="/posts"
        className="text-black-500 dark:text-white-500 hover:text-black dark:hover:text-white"
      >
        Posts
      </Link>
    </nav>
  )
}

export default NavigationMenu
