'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Download, Search } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const CustomerFilters: FC<Props> = (props) => {
  return (
    <div className="flex  mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 text-muted-foreground -translate-y-1/2" />
          <Input placeholder="Search..." className="w-full  pl-[50px]" />
        </div>
        <Select>
          <SelectTrigger>
            <span className="text-muted-foreground">Status:All</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Status:All">All</SelectItem>
            <SelectItem value="Status:Sport">Active</SelectItem>
            <SelectItem value="Status:Technology">In Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default CustomerFilters;
