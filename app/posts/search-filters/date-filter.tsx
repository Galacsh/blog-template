'use client'

import { useSearch } from '@/hooks'
import { validDateString } from '@/utils'

type Props = {
  className?: string
}

export default function DateFilter({ className }: Props) {
  const [from, setFrom] = useSearch('from', '', toState, toParam)
  const [to, setTo] = useSearch('to', '', toState, toParam)

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <label htmlFor="from" className="mr-2 font-bold">
        Date:
      </label>
      <input
        id="from"
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        pattern="\d{4}-\d{2}-\d{2}"
        className="bg-white border border-black-300 text-sm rounded-lg focus:ring-black-500 focus:border-black-700 block px-2 py-1 dark:bg-black dark:border-white-300 dark:placeholder-white-300 dark:focus:ring-white-500 dark:focus:border-white-700"
      />
      <label htmlFor="to" className="mx-2">
        ~
      </label>
      <input
        id="to"
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        pattern="\d{4}-\d{2}-\d{2}"
        className="bg-white border border-black-300 text-sm rounded-lg focus:ring-black-500 focus:border-black-700 block px-2 py-1 dark:bg-black dark:border-white-300 dark:placeholder-white-300 dark:focus:ring-white-500 dark:focus:border-white-700"
      />
    </div>
  )
}

function toState(val: string | null) {
  return validDateString(val)
}
function toParam(state: string) {
  return state
}
