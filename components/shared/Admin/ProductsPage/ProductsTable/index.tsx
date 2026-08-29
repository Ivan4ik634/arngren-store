'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EllipsisVerticalIcon } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const ProductsTable: FC<Props> = (props) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] ">Title</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="w-[100px]">Title</TableCell>
          <TableCell className="flex items-center font-medium">
            <Avatar size="lg">
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="ml-3">John Smith</p>
            </div>
          </TableCell>
          <TableCell className="font-bold">$2320</TableCell>
          <TableCell>
            <div>
              <p>May 24 2025 </p>
              <p className="opacity-50">10:10 AM</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
              <p className="text-green-500">In stock</p>
            </div>
          </TableCell>
          <TableCell className="">3</TableCell>
          <TableCell className="text-right">
            <EllipsisVerticalIcon />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
