'use client';

import { Button } from '@/components/ui/button';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { PAGES } from '@/configs/PAGES';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {}

const benefits = [
  { icon: Truck, title: 'Fast delivery', detail: '2–5 days' },
  { icon: ShieldCheck, title: 'Secure payment', detail: '100% safe' },
  { icon: Sparkles, title: 'Premium quality', detail: 'Only the best' },
];

const HeroSection: FC<Props> = (props) => {
  return (
    <main className="relative isolate h-[calc(100svh-150px)] overflow-hidden ">
      <div className="relative mx-auto gap-x-27  flex h-full items-center  py-16  lg:py-20">
        <div className="w-full max-w-[600px] flex-1 lg:-translate-y-2">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            PREMIUM MARKETPLACE
          </p>
          <Title>
            Better products.
            <br />
            <span className="text-[#0969ff]">For your life.</span>
          </Title>
          <Description>
            Discover high-quality products, modern style and reliable brands. Everything you need —
            in one place.
          </Description>

          <div className="mt-7 flex gap-x-5">
            <Link href={PAGES.MENU} className="">
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

          <div className="mt-14 flex gap-x-5   divide-[#cbd5e3] sm:mt-16">
            {benefits.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex min-w-0 flex-1 items-start gap-2.5 px-3 first:pl-0 last:pr-0 sm:gap-3 sm:px-8">
                <Icon className="mt-0.5 size-[24px] shrink-0 text-[#142137]" strokeWidth={1.8} />
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-[10px] font-semibold text-[#26344a] sm:text-[16px]">
                    {title}
                  </p>
                  <p className="mt-1 whitespace-nowrap text-[9px] text-[#71819a] sm:text-[12px]">
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
          className="w-[600px] rounded-2xl object-cover object-center"
        />
      </div>
    </main>
  );
};

export default HeroSection;
