/* eslint-disable @next/next/no-img-element */

import type { ComponentProps } from 'react'
import { config } from '@/lib/config'

export function Image({ alt, src }: ComponentProps<'img'>) {
  if (src == null) throw new Error("Image 'src' is required.")

  let source = src.includes('://') ? src : internalSrc(src)

  return (
    <img
      alt={alt as string}
      src={source}
      className="max-h-[75vh] sm:shadow-xl rounded-md object-contain"
    />
  )
}

function internalSrc(src: string) {
  let parts = src.split('/')
  parts.unshift(config.basePath)
  parts = parts.filter((s) => s !== '')
  const joined = parts.join('/')
  return joined.startsWith('/') ? joined : `/${joined}`
}
