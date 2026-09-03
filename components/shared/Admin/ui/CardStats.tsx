'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CardStatsT } from '@/types/ApplicationT';
import { FC } from 'react';

interface Props {
  data: CardStatsT[];
}

const CardStats: FC<Props> = (props) => {
  return (
    <div className="grid mt-10 grid-cols-5 gap-x-5">
      {props.data.map((item) => (
        <Card key={item.title}>
          <CardContent className="flex items-center">
            <div className={`p-3 rounded-full ${item.iconWrapperClassName ?? 'bg-primary/10'}`}>
              <item.icon className={`size-5 ${item.iconClassName ?? 'text-primary'}`} />
            </div>
            <div className="ml-4">
              <p className="opacity-50">{item.title}</p>
              <p className="font-bold text-xl">{item.info}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardStats;
