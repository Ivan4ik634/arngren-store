'use client';

import { Button } from '@/components/ui/button';
import { NOT_FOUND_DATA, type NotFoundDataT } from '@/data/not-found';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  type: keyof typeof NOT_FOUND_DATA;
  className?: string;
}

const NotFoundData: FC<Props> = ({ type, className }) => {
  const data: NotFoundDataT = NOT_FOUND_DATA[type];
  const Icon = data.icon;

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 py-16 text-center ${className ?? ''}`}>
      <div className="flex size-20 items-center justify-center rounded-full bg-muted">
        <Icon className="size-10 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{data.description}</p>
      </div>
      {data.buttonText && data.buttonLink && (
        <Link href={data.buttonLink}>
          <Button variant="outline" className="mt-2">
            {data.buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NotFoundData;
