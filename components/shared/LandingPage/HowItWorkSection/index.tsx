'use client';

import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { FC } from 'react';
import ZoomableImage from '../../ZoomableImage';

interface Props {}

const steps = [
  {
    image: '/landing/Menu.png',
    title: 'Explore',
    description: 'Find products you like. Search by name or use filters.',
  },
  {
    image: '/landing/Product.png',
    title: 'Choose',
    description: 'Compare prices and read reviews to pick the best option.',
  },
  {
    image: '/landing/Cart.png',
    title: 'Order',
    description: 'Check out in just a few clicks.',
  },
  {
    image: '/landing/Orders.png',
    title: 'Enjoy',
    description: 'Track your delivery and get your order at your door.',
  },
];

const HowItWorkSection: FC<Props> = (props) => {
  return (
    <main
      id="how-it-works"
      className="relative isolate flex flex-col justify-center min-h-[600px] py-24 overflow-hidden ">
      <div className="relative flex  max-w-[1400px] items-center  py-16  lg:py-20">
        <div className="w-full max-w-[600px] ">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            HOW IT WORKS
          </p>
          <Title>Shop in 4 simple steps</Title>
          <Description>From finding a product to getting it at your door.</Description>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div className="step" key={step.title}>
            <ZoomableImage
              className="w-full rounded-2xl border-2 "
              src={step.image}
              alt={step.title}
            />
            <span className="mt-4  block text-sm font-semibold text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Title className="mt-1 text-2xl font-bold">{step.title}</Title>
            <Description className="mt-1 text-sm">{step.description}</Description>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HowItWorkSection;
