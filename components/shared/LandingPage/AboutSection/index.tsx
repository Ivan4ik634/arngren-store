'use client';

import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { FC } from 'react';

const AboutSection: FC = () => {
  return (
    <main id="about" className="relative isolate overflow-hidden py-10 sm:py-14 lg:min-h-[600px] lg:py-24">
      <div className="relative mx-auto flex flex-col gap-7 py-6 sm:py-10 lg:h-full lg:flex-row lg:items-center lg:gap-x-16 lg:py-20 xl:gap-x-27">
        <img
          src="/landing/about.png"
          alt="Premium products including sneakers, headphones, and a water bottle"
          className="w-full max-w-[700px] rounded-2xl object-cover object-center"
        />
        <div className="w-full min-w-0 max-w-[600px] flex-1 lg:-translate-y-2">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            ABOUT US
          </p>
          <Title className="mb-5 text-[clamp(2rem,6vw,3.25rem)] leading-[1.1]">
            Quality products. Thoughtfully selected.
          </Title>
          <Description>
            At ARNGREN, we believe that good products should make everyday life easier, better, and
            more enjoyable. We carefully select products that combine quality, modern design, and
            practical functionality. From everyday essentials to modern lifestyle products, our goal
            is to bring everything you need into one simple and convenient place. Our mission is
            simple - better products, for your life.
          </Description>
        </div>
      </div>
    </main>
  );
};

export default AboutSection;
