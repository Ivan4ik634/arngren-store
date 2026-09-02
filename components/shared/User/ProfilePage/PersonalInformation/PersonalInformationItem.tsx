'use client';

import { PersonalInformationItemT } from '@/types/UserT';
import { FC } from 'react';

interface Props extends PersonalInformationItemT {
  index: number;
}

const PersonalInformationItem: FC<Props> = (props) => {
  return (
    <div
      className={`grid items-center  grid-cols-[400px_100px] w-full py-3 px-4 ${props.index > 0 && 'border-t'}`}>
      <div className="flex items-center">
        <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
          <props.icon />
        </div>
        <p>{props.title}</p>
      </div>
      <div>{props.info}</div>
    </div>
  );
};

export default PersonalInformationItem;
