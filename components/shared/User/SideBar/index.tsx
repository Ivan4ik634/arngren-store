'use client';

import { UserLinks } from '@/data/Links';
import { FC } from 'react';
import LinkItem from '../../Admin/AdminSideBar/LinkItem';

type Props = Record<string, never>;

const UserSideBar: FC<Props> = (props) => {
  return (
    <nav aria-label="Account navigation" className="-mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 md:mx-0 md:w-[200px] md:overflow-visible md:px-0 xl:w-[260px]">
      <div className="flex w-max gap-2 md:w-full md:flex-col md:gap-y-3">
        {UserLinks.map((link) => (
          <LinkItem
            {...link}
            key={link.name}
            className="w-auto shrink-0 whitespace-nowrap px-3 md:w-full md:px-4"
          />
        ))}
      </div>
    </nav>
  );
};

export default UserSideBar;
