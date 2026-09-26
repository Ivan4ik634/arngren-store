'use client';

import { PAGES } from '@/configs/PAGES';
import Link from 'next/link';
import { FC } from 'react';
import { FaGithub, FaInstagram, FaTelegram, FaThreads, FaTiktok } from 'react-icons/fa6';

interface Props {}

const navLinks = [
  { label: 'Home', href: PAGES.HOME },
  { label: 'Menu', href: PAGES.MENU },
  { label: 'About', href: PAGES.ABOUT },
  { label: 'FAQ', href: PAGES.FAQ },
  { label: 'How it works', href: PAGES.HOW_IT_WORKS },
];

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram', href: 'hhttps://www.instagram.com/white_fullstack' },
  { icon: FaGithub, label: 'Github', href: 'https://github.com/Ivan4ik634' },
  { icon: FaThreads, label: 'Threads', href: 'https://www.threads.com/@white_fullstack' },
  { icon: FaTelegram, label: 'Telegram', href: 'https://t.me/WhiteDev15' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com/@whiteformdeveloper' },
];

const Footer: FC<Props> = (props) => {
  return (
    <footer id="footer" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="max-w-[320px]">
          <Link href={PAGES.HOME} className="text-2xl font-black tracking-tight text-black">
            <img src="/logo.png" alt="ARNGREN" className="aspect-[758/122] w-[200px]" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            A modern marketplace with carefully selected products, reliable brands and a seamless
            shopping experience - everything you need in one place.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Navigation</p>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#0969ff]">
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Legal</p>
          <Link
            href={PAGES.TERMS}
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#0969ff]">
            Terms of Service
          </Link>
          <Link
            href={PAGES.PRIVACY_POLICY}
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#0969ff]">
            Privacy Policy
          </Link>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Follow us</p>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-[#0969ff] hover:bg-[#0969ff] hover:text-white">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Arngren Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
