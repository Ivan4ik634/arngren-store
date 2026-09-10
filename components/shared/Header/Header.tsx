import { Heart, Package, UserRound } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/PAGES';
import BagCartDrawer from './BagCartDrawer';

const navItems = ['Home', 'Menu', 'Deals', 'About', 'Contact'];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] w-full max-w-[1500px] items-center gap-8 px-6 lg:px-10">
        <Link href="/" className="text-2xl font-black tracking-tight text-black">
          ARNGREN
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-semibold text-black lg:flex">
          {navItems.map((item) => (
            <Link
              href="/"
              key={item}
              className={
                item === 'Menu'
                  ? 'relative text-[#0969ff] after:absolute after:-bottom-[26px] after:left-0 after:h-0.5 after:w-full after:bg-[#0969ff]'
                  : 'transition-colors hover:text-[#0969ff]'
              }>
              {item}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <Link href={PAGES.PROFILE}>
            <button
              className="hidden text-black transition-colors hover:text-[#0969ff] sm:block"
              aria-label="Account">
              <UserRound className="size-5" />
            </button>
          </Link>
          <Link href={PAGES.WISHLIST}>
            <button
              className="relative text-black transition-colors hover:text-[#0969ff]"
              aria-label="Wishlist">
              <Heart className="size-5" />
            </button>
          </Link>
          <BagCartDrawer />
          <Link href={PAGES.CART}>
            <Button className="hidden h-9 rounded-md bg-[#0969ff] px-7 shadow-[0_8px_18px_rgba(9,105,255,0.22)] hover:bg-[#0057df] md:inline-flex">
              Order now
            </Button>
          </Link>
          <button className="lg:hidden" aria-label="Open menu">
            <Package className="size-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
