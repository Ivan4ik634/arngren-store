'use client';

import { LinkT } from '@/types/LinkT';
import Link from 'next/link';
import { FC } from 'react';

interface Props extends LinkT {}

const LinkItem: FC<Props> = (props) => {
  return (
    <Link
      href={props.href}
      className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-primary/20 duration-300 transition-all w-full ">
      <props.icon className="size-5" />
      <span>{props.name}</span>
    </Link>
  );
};

export default LinkItem;
