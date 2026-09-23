'use client';

import { Card, CardContent } from '@/components/ui/card';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { ShieldCheck, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const benefits = [
  {
    icon: Sparkles,
    title: 'Curated Products',
    detail: 'Carefully selected products worth bringing into your everyday life.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Quality',
    detail: 'Products chosen with quality, functionality, and value in mind.',
  },
  {
    icon: ShoppingBag,
    title: 'Simple Shopping',
    detail: 'A smooth and convenient experience from discovery to checkout.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    detail: 'Get your order delivered quickly and safely to your door.',
  },
];
const WhatWeOfferSection: FC<Props> = (props) => {
  return (
    <main
      id="about"
      className="relative isolate flex flex-col justify-center h-screen overflow-hidden ">
      <div className="relative flex  max-w-[1400px] items-center  py-16  lg:py-20">
        <div className="w-full max-w-[600px] ">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            WHAT WE OFFER
          </p>
          <Title>Everything You Need, All in One Place.</Title>
          <Description>
            Thoughtfully selected products and a seamless shopping experience, made with you in
            mind.
          </Description>
        </div>
      </div>
      <div className="grid-cols-2 grid gap-[30px]">
        {benefits.map((item, index) => (
          <Card key={index}>
            <CardContent className="flex items-start">
              <div className="p-3 rounded-full bg-primary/10">
                <item.icon className="size-10 text-primary" />
              </div>
              <div className="ml-4">
                <Title className="font-bold text-[28px]  tracking-[-0.02em]">{item.title}</Title>
                <Description className="text-[20px]">{item.detail}</Description>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default WhatWeOfferSection;
