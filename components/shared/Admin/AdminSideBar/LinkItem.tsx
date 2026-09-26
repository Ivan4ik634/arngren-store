'use client';

import { cn } from '@/lib/utils';
import { LinkT } from '@/types/LinkT';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

type Props = LinkT & { className?: string };

const LinkItem: FC<Props> = (props) => {
  const pathname = usePathname();
  const Icon = props.icon as LucideIcon;
  return (
    <Link
      href={props.href}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-4 py-2 transition-all duration-300 hover:bg-primary/20',
        pathname === props.href && 'bg-primary/20',
        props.className,
      )}>
      <Icon className="size-5" />
      <span>{props.name}</span>
    </Link>
  );
};

export default LinkItem;
