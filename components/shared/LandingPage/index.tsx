'use client';

import { FC } from 'react';

import AboutSection from './AboutSection';
import HeroSection from './HeroSection';

interface Props {}

const LandingPage: FC<Props> = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
};

export default LandingPage;
