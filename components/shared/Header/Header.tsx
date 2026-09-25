'use client';

import { Heart, Menu, UserRound, Wallet, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/PAGES';
import { useProfile } from '@/hooks/useProfile';
import BagCartDrawer from './BagCartDrawer';

const navItems = [
  { link: PAGES.HOME, value: 'Home' },
  { link: PAGES.MENU, value: 'Menu' },
  { link: PAGES.CONTACT, value: 'Contact' },
  { link: PAGES.ABOUT, value: 'About' },
];

export function Header() {
  const { profile } = useProfile();
  const isAuthenticated = Boolean(profile);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 h-[70px] w-full border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] w-full max-w-[1500px] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-10">
        <Link href={PAGES.HOME} onClick={closeMobileMenu} aria-label="ARNGREN home" className="shrink-0">
          <img src="/logo.png" alt="ARNGREN" className="aspect-video w-[132px] min-[375px]:w-[150px] sm:w-[190px] lg:w-[230px]" />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-semibold text-black lg:flex">
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.value}
              className={
                pathname === item.link
                  ? 'relative text-[#0969ff] after:absolute after:-bottom-[26px] after:left-0 after:h-0.5 after:w-full after:bg-[#0969ff]'
                  : 'transition-colors hover:text-[#0969ff]'
              }>
              {item.value}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-5">
          {isAuthenticated ? (
            <>
              <Link href={PAGES.PROFILE} className="hidden min-h-10 min-w-10 items-center justify-center text-black transition-colors hover:text-[#0969ff] sm:flex" aria-label="Account">
                <UserRound className="size-5" />
              </Link>
              <Link href={PAGES.BALANCE} className="flex min-h-10 min-w-10 items-center justify-center text-black transition-colors hover:text-[#0969ff]" aria-label="Wallet">
                <Wallet className="size-5" />
              </Link>
              <Link href={PAGES.WISHLIST} className="flex min-h-10 min-w-10 items-center justify-center text-black transition-colors hover:text-[#0969ff]" aria-label="Wishlist">
                <Heart className="size-5" />
              </Link>
              <div className="hidden sm:block"><BagCartDrawer /></div>
              <Link href={PAGES.CART} className="hidden md:block">
                <Button className="h-9 rounded-md bg-[#0969ff] px-7 hover:bg-[#0057df]">
                  Order now
                </Button>
              </Link>
            </>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link href={PAGES.REGISTER}>
                <Button variant="outline" className="h-9 rounded-md px-5">Register</Button>
              </Link>
              <Link href={PAGES.LOGIN}>
                <Button className="h-9 rounded-md bg-[#0969ff] px-7 hover:bg-[#0057df]">Login</Button>
              </Link>
            </div>
          )}

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md text-black transition-colors hover:bg-zinc-100 lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-70px)] overflow-y-auto border-b border-zinc-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-1">
            {navItems.map((item) => (
              <Link
                href={item.link}
                key={item.value}
                onClick={closeMobileMenu}
                className={`rounded-md px-3 py-3 text-sm font-semibold ${pathname === item.link ? 'bg-blue-50 text-[#0969ff]' : 'text-zinc-800 hover:bg-zinc-50'}`}>
                {item.value}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link href={PAGES.PROFILE} onClick={closeMobileMenu} className="rounded-md px-3 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">My profile</Link>
                <Link href={PAGES.BALANCE} onClick={closeMobileMenu} className="rounded-md px-3 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">My balance</Link>
                <Link href={PAGES.WISHLIST} onClick={closeMobileMenu} className="rounded-md px-3 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">Wishlist</Link>
                <Link href={PAGES.CART} onClick={closeMobileMenu} className="rounded-md px-3 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">Cart and checkout</Link>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-3">
                <Link href={PAGES.REGISTER} onClick={closeMobileMenu}><Button variant="outline" className="h-10 w-full">Register</Button></Link>
                <Link href={PAGES.LOGIN} onClick={closeMobileMenu}><Button className="h-10 w-full bg-[#0969ff] hover:bg-[#0057df]">Login</Button></Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
