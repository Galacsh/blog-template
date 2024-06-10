/* eslint-disable @next/next/no-img-element */
export function Image({ alt, src }: React.ComponentProps<'img'>) {
  return (
    <img
      alt={alt as string}
      src={src as string}
      className="max-h-[75vh] sm:shadow-xl rounded-md object-contain"
    />
  )
}
