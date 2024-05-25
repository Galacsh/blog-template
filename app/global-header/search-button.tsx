import { Search } from 'lucide-react'

export default function SearchButton() {
  return (
    <button
      type="button"
      className="hover:opacity-50 h-8 w-8 bg-white dark:bg-black border border-black-300 dark:border-white-300 rounded flex items-center justify-center"
    >
      <Search className="h-4 w-4 stroke-black dark:stroke-white" />
      <span className="sr-only">Open quick search panel</span>
    </button>
  )
}
