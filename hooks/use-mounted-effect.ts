'use client'

import { useRef, useEffect } from 'react'

import type { DependencyList, EffectCallback } from 'react'

/**
 * A custom hook that works like `useEffect(...)`,
 * but skips execution on the initial render.
 */
export function useMountedEffect(effect: EffectCallback, deps?: DependencyList) {
  const executionCount = useRef(0)

  useEffect(
    () => {
      if (executionCount.current < COUNT_PER_ENV) {
        executionCount.current++
      } else {
        return effect()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ([effect] as DependencyList).concat(deps || [])
  )
}

const COUNT_PER_ENV = process.env.NODE_ENV === 'development' ? 2 : 1
