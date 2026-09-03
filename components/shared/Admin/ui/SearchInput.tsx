'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<typeof Input> {
  wrapperClassName?: string;
}

const SearchInput: FC<Props> = ({ className, wrapperClassName, placeholder = 'Search...', ...props }) => {
  return (
    <div className={cn('relative', wrapperClassName)}>
      <Search className="absolute top-1/2 left-3 size-4 text-muted-foreground -translate-y-1/2" />
      <Input placeholder={placeholder} className={cn('w-full pl-[50px]', className)} {...props} />
    </div>
  );
};

export default SearchInput;
