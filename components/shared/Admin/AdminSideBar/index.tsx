'use client';

import { AdminLinks } from '@/data/Links';
import { FC } from 'react';
import LinkItem from './LinkItem';

type Props = Record<string, never>;

const AdminSideBar: FC<Props> = (props) => {
  return (
    <div className="flex w-full flex-col gap-y-3 md:w-[200px] xl:w-[300px]">
      {AdminLinks.map((link) => (
        <LinkItem {...link} key={link.name} />
      ))}
    </div>
  );
};

export default AdminSideBar;
