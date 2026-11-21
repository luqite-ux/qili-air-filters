import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { protectPreviewResponse } from '@/lib/site-content/preview-protection'

const PREVIEW_COOKIE = '__Host-hq-site-preview'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const publicAdminPath = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
  if (!publicAdminPath && pathname.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    return NextResponse.redirect(url)
  }
  const response = NextResponse.next()
  protectPreviewResponse(response.headers, Boolean(request.cookies.get(PREVIEW_COOKIE)?.value))
  return response
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.jpg|apple-icon.jpg|images/).*)'] }
