import tags from '@/markdown/tags.json'

export async function generateStaticParams() {
  return []
}

export async function GET() {
  return Response.json({ tags })
}
