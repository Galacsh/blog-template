'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import type { Dispatch, SetStateAction } from 'react'

/**
 * A custom hook that provides state management tied to URL search parameters.
 * It returns a state value and a `set` function same as `useState(...)`.
 */
export function useSearchState<S>(
  key: string,
  initialState: S | (() => S),
  toState: (val: string | null) => S,
  toParam: (state: S) => string | null
): [S, Dispatch<SetStateAction<S>>] {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Set initial state.
  // First, try to get from search param.
  // If no search param, use given initial state.
  const [state, setState] = useState<S>(() => {
    const param = toState(searchParams.get(key))
    if (param) return param
    return typeof initialState === 'function' ? (initialState as Function)() : initialState
  })

  /**
   * Update parameter with state value.
   * Performs a client-side route replacing.
   */
  const updateParam = useCallback(
    (stateToSync: S) => {
      const params = new URLSearchParams(searchParams.toString())
      const value = toParam(stateToSync)

      if (value) params.set(key, value)
      else params.delete(key)

      if (params.size === 0) replace(pathname)
      else replace(`${pathname}?${params.toString()}`)
    },
    [key, toParam, replace, pathname, searchParams]
  )

  // when state changes, update param
  useEffect(
    () => {
      const val = toState(searchParams.get(key))
      if (val !== state) updateParam(state)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  // when param changes, update state
  useEffect(
    () => {
      const val = toState(searchParams.get(key))
      if (val !== state) setState(val)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  )

  return [state, setState]
}

/**
 * A custom hook that provides state tied to URL search parameters.
 * It returns a state value without the `set` function.
 */
export function useSearch<S>(
  key: string,
  initialState: S | (() => S),
  toState: (val: string | null) => S
): S {
  const searchParams = useSearchParams()

  // Set initial state.
  // First, try to get from search param.
  // If no search param, use given initial state.
  const [state, setState] = useState<S>(() => {
    const param = toState(searchParams.get(key))
    if (param) return param
    return typeof initialState === 'function' ? (initialState as Function)() : initialState
  })

  // when param changes, update state
  useEffect(
    () => {
      const val = toState(searchParams.get(key))
      if (val !== state) setState(val)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  )

  return state
}
