import { image } from '@/lib/og/image'
import { getSlugs, getInfo } from '@/lib/posts'

type Props = Readonly<{
  params: {
    slug: string[]
  }
}>

/**
 * Workaround to generate OpenGraph image
 */
export function GET(_: Request, { params }: Props) {
  const info = getInfo(params.slug.map(encodeURIComponent))
  return image(info.title)
}

export function generateStaticParams() {
  const slugs = getSlugs()
  if (process.env.NODE_ENV === 'production') {
    return slugs.map((s) => s.map(decodeURIComponent)).map((s) => ({ slug: s }))
  } else {
    return slugs.map((s) => ({ slug: s }))
  }
}
