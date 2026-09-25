'use client';

import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface Props {
  label?: string;
  className?: string;
}

const Loading: FC<Props> = ({ label = 'Loading', className }) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-3 py-10 text-center sm:py-16 ${className ?? ''}`}>
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
};

export default Loading;
