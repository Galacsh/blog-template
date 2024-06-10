import { image } from '@/lib/og/image'

/**
 * Workaround to generate OpenGraph image
 */
export function GET() {
  return image(process.env.APP_NAME)
}

export function generateStaticParams() {
  return []
}
