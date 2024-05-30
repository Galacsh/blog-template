'use client'

import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [y, setY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    function onScroll() {
      setDirection(window.scrollY > y ? 'down' : 'up')
      setY(window.scrollY)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [y])

  return direction
}
