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
import { EllipsisVertical } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const CustomersTable: FC<Props> = (props) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
          </TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Total spent</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="w-[50px] ">
            <Checkbox />
          </TableCell>

          <TableCell>
            <div className="flex items-center">
              <Avatar size="lg">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="ml-5">
                <h1>
                  <span className="font-bold">John Smith</span>
                </h1>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <p className="opacity-50">jongsmith@me.com</p>
          </TableCell>
          <TableCell>12</TableCell>
          <TableCell>$1200</TableCell>
          <TableCell className="flex items-start">
            <div className="px-5 py-2  bg-green-500/20 rounded-full">
              <p className="text-green-500">Active</p>
            </div>
          </TableCell>
          <TableCell>
            <div>
              <p>May 24 2025 </p>
              <p className="opacity-50">10:10 AM</p>
            </div>
          </TableCell>
          <TableCell>
            <EllipsisVertical />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CustomersTable;
