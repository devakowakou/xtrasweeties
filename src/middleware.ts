import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'

import { fallbackLng, languages, cookieName } from './lib/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon|assets|favicon.ico|sw.js|site.webmanifest|manifest.json|robots.txt|sitemap.xml).*)'
  ]
}

export function middleware(req: NextRequest) {
  let lng

  if (req.cookies.has(cookieName)) {
    const cookie = req.cookies.get(cookieName)

    if (cookie) lng = acceptLanguage.get(cookie.value)
  }

  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  const referer = req.headers.get('referer')

  if (referer) {
    const refererUrl = new URL(referer)
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()

    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)

    return response
  }

  return NextResponse.next()
}
