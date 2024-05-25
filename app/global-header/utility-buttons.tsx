import ThemeToggler from './theme-toggler'
import SearchButton from './search-button'

export default function UtilityButtons() {
  return (
    <div className="flex items-center gap-2 px-4">
      {/* Search button */}
      <SearchButton />

      {/* Theme toggle button */}
      <ThemeToggler />
    </div>
  )
}
