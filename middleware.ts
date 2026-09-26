import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { PAGES } from './configs/PAGES';

const ADMIN_ROUTES = [
  PAGES.ADMIN_ORDERS,
  PAGES.ADMIN_PRODUCTS,
  PAGES.ADMIN_SETTINGS,
  PAGES.ADMIN_DASHBOARD,
  PAGES.CUSTOMERS,
  PAGES.APPLICATION,
  PAGES.WITHDRAWAL,
];

const PRIVATE_ROUTES = [
  PAGES.ORDERS,
  PAGES.ORDERS_SELLER,
  PAGES.SETTINGS,
  PAGES.PROFILE,
  PAGES.CHECKOUT_SUCCESS,
  PAGES.BALANCE,
  PAGES.WISHLIST,
  PAGES.CART,
];

const PUBLIC_ROUTES = [
  PAGES.HOME,
  PAGES.PRODUCTS,
  PAGES.HOW_IT_WORKS,
  PAGES.CALLBACK_GOOGLE,
  PAGES.CONTACT,
  PAGES.MENU,
  PAGES.ABOUT,
  PAGES.FAQ,
  PAGES.CALLBACK_X,
  PAGES.TERMS,
  PAGES.PRIVACY_POLICY,
  PAGES.LOGIN,
  PAGES.REGISTER,
];

const isExactRoute = (pathname: string, routes: string[]) => routes.includes(pathname);

const isDynamicRoute = (pathname: string) =>
  pathname.startsWith('/product/') || pathname.startsWith('/profile/');

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);

            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });

            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const pathname = request.nextUrl.pathname;

  const isAdminRoute = isExactRoute(pathname, ADMIN_ROUTES);
  const isPrivateRoute = isExactRoute(pathname, PRIVATE_ROUTES);
  const isPublicRoute = isExactRoute(pathname, PUBLIC_ROUTES) || isDynamicRoute(pathname);

  if (!isAdminRoute && !isPrivateRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Already authenticated → don't allow login/register pages
  if (user && (pathname === PAGES.LOGIN || pathname === PAGES.REGISTER)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return response;
  }

  if (isPrivateRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
