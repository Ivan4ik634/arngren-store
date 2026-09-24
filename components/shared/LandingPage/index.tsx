'use client';

import { FC } from 'react';

import Container from '../Container';
import AboutSection from './AboutSection';
import BigCtaSection from './BigCtaSection';
import CustomerReviews from './CustomerReviews';
import FaqSection from './FaqSection';
import Footer from './Footer';
import HeroSection from './HeroSection';
import HowItWorkSection from './HowItWorkSection';
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
      <HowItWorkSection />
      <CustomerReviews />
      <FaqSection />
      <BigCtaSection />
      <Footer />
    </Container>
  );
};

export default LandingPage;
