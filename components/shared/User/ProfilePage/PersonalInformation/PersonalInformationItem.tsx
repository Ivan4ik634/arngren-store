'use client';

import { PersonalInformationItemT } from '@/types/UserT';
import { FC } from 'react';

interface Props extends PersonalInformationItemT {
  index: number;
}

const PersonalInformationItem: FC<Props> = (props) => {
  return (
    <div
      className={`grid w-full grid-cols-1 items-start gap-2 px-2 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:px-4 ${props.index > 0 && 'border-t'}`}>
      <div className="flex min-w-0 items-center">
        <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
          <props.icon />
        </div>
        <p>{props.title}</p>
      </div>
      <div className="break-words  ">{props.info}</div>
    </div>
  );
};

export default PersonalInformationItem;
