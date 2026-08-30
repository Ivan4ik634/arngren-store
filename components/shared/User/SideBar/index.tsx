'use client';

import { UserLinks } from '@/data/Links';
import { FC } from 'react';
import LinkItem from '../../Admin/AdminSideBar/LinkItem';

interface Props {}

const UserSideBar: FC<Props> = (props) => {
  return (
    <div className="w-[300px] flex flex-col gap-y-3">
      {UserLinks.map((link) => (
        <LinkItem {...link} key={link.name} />
      ))}
    </div>
  );
};

export default UserSideBar;
