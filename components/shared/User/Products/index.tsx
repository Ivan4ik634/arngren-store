'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Search, Star } from 'lucide-react';
import { FC } from 'react';
import { products } from '../../Menu/data';

interface Props {}

const UserProductsPage: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Products</h1>
      <p className="opacity-50"> Manage your products</p>
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
      <div className="mt-5 grid grid-cols-4 gap-5">
        <Card className="relative gap-0 rounded-lg border border-zinc-200 bg-white p-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] ring-0">
          <div className="flex h-40 items-center justify-center px-4">
            <img
              src={products[0].image}
              alt={products[0].name}
              className="max-h-36 max-w-full object-contain"
            />
          </div>

          <div className="mt-3 min-w-0">
            <h3 className="truncate text-base font-bold text-black">{products[0].name}</h3>
            <p className="mt-1 text-sm text-zinc-500">{products[0].category}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-extrabold text-black">$ {products[0].price}</p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
              <span className="font-semibold text-[#0969ff]">{products[0].rating}</span>
              <span className="text-zinc-500">({products[0].reviews})</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProductsPage;
