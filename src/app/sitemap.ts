import type { MetadataRoute } from 'next'
import { languages } from '@/lib/i18n/settings'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [''] // Root paths under locales

  const sitemapEntries: MetadataRoute.Sitemap = []

  languages.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/${lang}${route}`,
        lastModified: new Date()
      })
    })
  })

  return sitemapEntries
}
