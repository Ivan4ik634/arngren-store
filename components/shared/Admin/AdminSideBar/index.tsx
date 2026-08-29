'use client';

import { AdminLinks } from '@/data/AdminLinks';
import { FC } from 'react';
import LinkItem from './LinkItem';

interface Props {}

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
