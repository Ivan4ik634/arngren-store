'use client';

import { Button } from '@/components/ui/button';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { PAGES } from '@/configs/PAGES';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const BigCtaSection: FC = () => {
  return (
    <main
      id="cta"
      className="relative isolate flex flex-col justify-center overflow-hidden py-12 sm:py-16 lg:min-h-[600px] lg:py-24">
      <div className="relative flex w-full  flex-col items-center text-center">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
          START SHOPPING
        </p>
        <Title className="text-[clamp(2.25rem,8vw,4.5rem)] lg:text-7xl">
          Better products.
          <br />
          <span className="text-[#0969ff]">For your life.</span>
        </Title>
        <Description className="mt-4 max-w-[500px] text-lg sm:text-xl">
          Discover something made for you.
        </Description>
        <Link href={PAGES.MENU} className="mt-10">
          <Button className="h-12 cursor-pointer rounded-[12px] px-8 text-[15px] font-semibold sm:h-14 sm:px-10 sm:text-base">
            Explore products
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default BigCtaSection;
