'use client';

import { cn } from 'cn';
import { FC } from 'react';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

const Description: FC<Props> = ({ children, className, ...props }) => {
  return (
    <p className={cn(`text-[15px] leading-[1.55] text-[#61738f]`, className)} {...props}>
      {children}
    </p>
  );
};

export default Description;
