'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
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

const OrdersTable: FC<Props> = (props) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
          </TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
          </TableHead>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>
            <div className="flex items-center">
              <Avatar size="lg">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="ml-5">
                <h1>
                  <span className="font-bold">John Smith</span>
                </h1>
                <p className="opacity-50">jongsmith@me.com</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div>
              <p>May 24 2025 </p>
              <p className="opacity-50">10:10 AM</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
              <p className="text-green-500">Completed</p>
            </div>
          </TableCell>
          <TableCell className="font-bold">$2320</TableCell>
          <TableCell className="">3</TableCell>
          <TableCell className="text-right">
            <EllipsisVerticalIcon />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
