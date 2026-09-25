'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={cn(`mx-auto w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-10`, className)}>{children}</div>;
};

export default Container;
