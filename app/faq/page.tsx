import Container from '@/components/shared/Container';
import FaqSection from '@/components/shared/LandingPage/FaqSection';
import { FC } from 'react';

const FaqPage: FC = () => {
  return (
    <Container className="max-w-[1400px]">
      <FaqSection />
    </Container>
  );
};

export default FaqPage;