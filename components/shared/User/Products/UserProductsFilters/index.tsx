'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const UserProductsFilters: FC<Props> = (props) => {
  return (
    <div className="flex gap-x-5 mt-5 items-center">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 text-muted-foreground -translate-y-1/2" />
        <Input placeholder="Search..." className="w-full  pl-[50px]" />
      </div>
      <Select>
        <SelectTrigger>
          <span className="text-muted-foreground">Category:All</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Category:All">All</SelectItem>
          <SelectItem value="Category:Sport">Sport</SelectItem>
          <SelectItem value="Category:Technology">Technology</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <span className="text-muted-foreground">Status:All</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Status:All">All</SelectItem>
          <SelectItem value="Status:Approved">Approved</SelectItem>
          <SelectItem value="Status:Rejected">Rejected</SelectItem>
          <SelectItem value="Status:Pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserProductsFilters;
