'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const Title: FC<Props> = ({ children, className, ...props }) => {
  return (
    <h1
      {...props}
      className={cn(
        `text-[clamp(2.25rem,7vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.065em] text-[#071124] `,
        className,
      )}>
      {children}
    </h1>
  );
};

export default Title;
