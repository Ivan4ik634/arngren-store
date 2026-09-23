'use client';

import { FC } from 'react';

interface Props {}

const AboutSection: FC<Props> = (props) => {
  return (
    <main className="relative isolate h-[calc(100svh-150px)] overflow-hidden ">
      <div className="relative mx-auto gap-x-27  flex h-full max-w-[1400px] items-center  py-16  lg:py-20">
        <img
          src="/landing/about.png"
          alt="Premium products including sneakers, headphones, and a water bottle"
          className="w-[700px] rounded-2xl object-cover object-center"
        />
        <div className="w-full flex-1 max-w-[600px] lg:-translate-y-2">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            ABOUT US
          </p>
          <h1 className="text-[60px]   font-extrabold leading-[0.97] tracking-[-0.065em] text-[#071124]">
            Quality products. Thoughtfully selected.
          </h1>
          <p id="about" className="mt-6   text-[15px] leading-[1.55] text-[#61738f] sm:text-base">
            At ARNGREN, we believe that good products should make everyday life easier, better, and
            more enjoyable. We carefully select products that combine quality, modern design, and
            practical functionality. From everyday essentials to modern lifestyle products, our goal
            is to bring everything you need into one simple and convenient place. Our mission is
            simple — better products, for your life.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutSection;
