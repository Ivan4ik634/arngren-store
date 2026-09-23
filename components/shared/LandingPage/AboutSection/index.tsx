'use client';

import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { FC } from 'react';

interface Props {}

const AboutSection: FC<Props> = (props) => {
  return (
    <main id="about" className="relative isolate h-[100svh] overflow-hidden ">
      <div className="relative mx-auto gap-x-27  flex h-full items-center  py-16  lg:py-20">
        <img
          src="/landing/about.png"
          alt="Premium products including sneakers, headphones, and a water bottle"
          className="w-[700px] rounded-2xl object-cover object-center"
        />
        <div className="w-full flex-1 max-w-[600px] lg:-translate-y-2">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            ABOUT US
          </p>
          <Title className="mb-5 text-[52px] leading-[1.1]">
            Quality products. Thoughtfully selected.
          </Title>
          <Description>
            At ARNGREN, we believe that good products should make everyday life easier, better, and
            more enjoyable. We carefully select products that combine quality, modern design, and
            practical functionality. From everyday essentials to modern lifestyle products, our goal
            is to bring everything you need into one simple and convenient place. Our mission is
            simple — better products, for your life.
          </Description>
        </div>
      </div>
    </main>
  );
};

export default AboutSection;
