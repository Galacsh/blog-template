import type { MetadataRoute } from 'next'

/**
 * This generates `sitemap.xml` during build time.
 * For more information:
 *     https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
 *
 * NOTE: In development mode(`npm run dev`) `/sitemap.xml` shows error,
 *     but works properly on build time. (https://github.com/vercel/next.js/issues/59136)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      lastModified,
    },
  ]
}
