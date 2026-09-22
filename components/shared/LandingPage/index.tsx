'use client';

import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/PAGES';
import Link from 'next/link';

interface Props {}

const benefits = [
  { icon: Truck, title: 'Fast delivery', detail: '2–5 days' },
  { icon: ShieldCheck, title: 'Secure payment', detail: '100% safe' },
  { icon: Sparkles, title: 'Premium quality', detail: 'Only the best' },
];

const LandingPage: FC<Props> = () => {
  return (
    <main className="relative isolate min-h-[calc(100svh-70px)] overflow-hidden sm:min-h-[calc(100svh-70px)] lg:min-h-[calc(100svh-70px)]">
      <div className="relative mx-auto flex gap-x-10 justify-between  min-h-[calc(100svh-70px)] max-w-[1400px] items-center  py-16  lg:py-20">
        <div className="w-full w-[600px] lg:-translate-y-2">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            PREMIUM MARKETPLACE
          </p>
          <h1 className="text-[clamp(3.25rem,5.2vw,5.15rem)] w-[600px]  font-extrabold leading-[0.97] tracking-[-0.065em] text-[#071124]">
            Better products.
            <br />
            <span className="text-[#0969ff]">For your life.</span>
          </h1>
          <p className="mt-6  text-[15px] leading-[1.55] text-[#61738f] sm:text-base">
            Discover high-quality products, modern style and reliable brands. Everything you need —
            in one place.
          </p>

          <Link href={PAGES.MENU} className="mt-7 inline-flex">
            <Button className="h-10 rounded-full bg-[#0969ff] px-5 text-[13px] font-semibold shadow-[0_10px_24px_rgba(9,105,255,0.28)] hover:bg-[#0058e8] sm:h-11 sm:px-6">
              Shop now
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>

          <div className="mt-14 flex  items-stretch divide-x divide-[#cbd5e3] sm:mt-16">
            {benefits.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex min-w-0 flex-1 items-start gap-2.5 px-3 first:pl-0 last:pr-0 sm:gap-3 sm:px-5">
                <Icon className="mt-0.5 size-[18px] shrink-0 text-[#142137]" strokeWidth={1.8} />
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-[10px] font-semibold text-[#26344a] sm:text-[11px]">
                    {title}
                  </p>
                  <p className="mt-1 whitespace-nowrap text-[9px] text-[#71819a] sm:text-[10px]">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img
          src="/preview-landing-removebg-preview.png"
          alt="Premium products including sneakers, headphones, and a water bottle"
          className="h-[600px] rounded-xl object-cover object-center"
        />
      </div>
    </main>
  );
};

export default LandingPage;
