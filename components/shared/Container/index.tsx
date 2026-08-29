'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={cn(`mx-auto w-full  px-6 py-6 lg:px-10`, className)}>{children}</div>;
};

export default Container;
