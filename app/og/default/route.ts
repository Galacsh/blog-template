import { image } from '@/lib/og/image'
import { config } from '@/lib/config'

/**
 * Workaround to generate OpenGraph image
 */
export function GET() {
  return image(config.name)
}

export function generateStaticParams() {
  return []
}
