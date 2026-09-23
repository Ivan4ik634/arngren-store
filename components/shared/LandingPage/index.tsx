'use client';

import { FC } from 'react';

import Container from '../Container';
import AboutSection from './AboutSection';
import HeroSection from './HeroSection';
import PopularProducts from './PopularProducts';
import WhatWeOfferSection from './WhatWeOfferSection';

interface Props {}

const LandingPage: FC<Props> = () => {
  return (
    <Container className="max-w-[1400px]">
      <HeroSection />
      <AboutSection />
      <WhatWeOfferSection />
      <PopularProducts />
    </Container>
  );
};

export default LandingPage;
