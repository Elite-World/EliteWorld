import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'zh'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, Next.js internals, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Check if the path already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // 1. Check Cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    request.nextUrl.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // 2. Check Geo-IP
  const country = request.headers.get('x-vercel-ip-country');
  let inferredLocale = defaultLocale;
  
  if (country && ['CN', 'TW', 'HK', 'MO'].includes(country)) {
    inferredLocale = 'zh';
  } else {
    // 3. Fallback to Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage && acceptLanguage.toLowerCase().includes('zh')) {
      inferredLocale = 'zh';
    }
  }

  // Redirect to the inferred locale
  request.nextUrl.pathname = `/${inferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and files with an extension
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
