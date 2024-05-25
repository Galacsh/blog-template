'use client'

import { useEffect, useState } from 'react'
import { useDebounce, useSearch } from '@/hooks'

type Props = {
  className?: string
}

export default function TextFilter({ className }: Props) {
  const [text, setText] = useSearch('query', '', toState, toParam)

  // create buffer with text
  const [buffer, setBuffer] = useState(text)

  // force sync between text and buffer
  useEffect(() => setBuffer(text), [text])

  // debouncing search param update
  const debounced = useDebounce(buffer)
  useEffect(() => setText(debounced), [debounced, setText])

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <label htmlFor="search" className="sr-only">
        Search by text
      </label>
      <input
        type="search"
        id="search"
        value={buffer}
        onChange={(e) => setBuffer(e.target.value)}
        className="block w-full p-1 text-sm rounded border focus:outline-none bg-white border-black-300 focus:border-black-700 dark:bg-black dark:border-white-300 dark:focus:border-white-700"
        placeholder="Search by text (title / series / description)"
      />
    </div>
  )
}

function toState(val: string | null) {
  return val || ''
}

function toParam(state: string) {
  return state
}
