'use client';

import { Button } from '@/components/ui/button';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { PAGES } from '@/configs/PAGES';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const benefits = [
  { icon: Truck, title: 'Fast delivery', detail: '2–5 days' },
  { icon: ShieldCheck, title: 'Secure payment', detail: '100% safe' },
  { icon: Sparkles, title: 'Premium quality', detail: 'Only the best' },
];

const HeroSection: FC = () => {
  return (
    <main className="relative isolate overflow-hidden lg:h-[calc(100svh-150px)] lg:min-h-[620px]">
      <div className="relative mx-auto flex flex-col gap-8 py-8 sm:py-10 lg:h-full lg:flex-row lg:items-center lg:gap-x-20 lg:py-20">
        <div className="w-full min-w-0 max-w-[600px] flex-1 lg:-translate-y-2">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            PREMIUM MARKETPLACE
          </p>
          <Title>
            Better products.
            <br />
            <span className="text-[#0969ff]">For your life.</span>
          </Title>
          <Description>
            Discover high-quality products, modern style and reliable brands. Everything you need -
            in one place.
          </Description>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-x-5">
            <Link href={PAGES.MENU}>
              <Button className="h-10 cursor-pointer rounded-[10px]  px-5 text-[13px] font-semibold   sm:h-11 sm:px-6">
                Shop now
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <a href={PAGES.ABOUT}>
              <Button
                variant="outline"
                className="h-10 cursor-pointer rounded-[10px]  px-5 text-[13px] font-semibold   sm:h-11 sm:px-6">
                About us
              </Button>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-3 lg:flex lg:gap-x-5">
            {benefits.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex min-w-0 items-start gap-1.5 sm:gap-2.5 lg:flex-1 lg:px-4 lg:first:pl-0 lg:last:pr-0">
                <Icon className="mt-0.5 size-4 shrink-0 text-[#142137] sm:size-5 lg:size-6" strokeWidth={1.8} />
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold leading-tight text-[#26344a] min-[375px]:text-[10px] sm:text-sm lg:text-base">
                    {title}
                  </p>
                  <p className="mt-1 text-[9px] leading-tight text-[#71819a] sm:text-[11px] lg:text-xs">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img
          src="/landing/hero.png"
          alt="Premium products including sneakers, headphones, and a water bottle"
          className="w-full max-w-[600px] self-center rounded-2xl object-cover object-center lg:flex-1"
        />
      </div>
    </main>
  );
};

export default HeroSection;
