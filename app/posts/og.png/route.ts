import { image } from '@/lib/og/image'

export async function generateStaticParams() {
  return []
}

/**
 * Workaround to generate OpenGraph image
 */
export async function GET() {
  return image('Posts')
}
