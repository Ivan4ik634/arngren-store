'use client';

import { AdminLinks } from '@/data/Links';
import { FC } from 'react';
import LinkItem from './LinkItem';

type Props = Record<string, never>;

const AdminSideBar: FC<Props> = (props) => {
  return (
    <div className="w-[300px] flex flex-col gap-y-3">
      {AdminLinks.map((link) => (
        <LinkItem {...link} key={link.name} />
      ))}
    </div>
  );
};

export default AdminSideBar;
