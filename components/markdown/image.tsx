/* eslint-disable @next/next/no-img-element */

import type { ComponentProps } from 'react'

export function Image({ alt, src }: ComponentProps<'img'>) {
  return (
    <img
      alt={alt as string}
      src={src as string}
      className="max-h-[75vh] sm:shadow-xl rounded-md object-contain"
    />
  )
}
