'use client'

import { useState, useEffect } from 'react'

/**
 * A custom hook that debounces a state value.
 * It delays updating the returned value until after the specified delay has passed
 * since the last change to the input state.
 */
export function useDebounce(state: string, delay: number = 300) {
  const [debounced, setDebounced] = useState(state)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(state), delay)
    return () => clearTimeout(handler)
  }, [state, delay])

  return debounced
}
