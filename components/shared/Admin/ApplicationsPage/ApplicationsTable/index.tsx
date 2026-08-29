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
import { Check, Eye, X } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const ApplicationsTable: FC<Props> = (props) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
          </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Submitted Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
          </TableHead>
          <TableCell className="font-medium flex">
            <img src="design.png" className="w-[50px] aspect-square rouded-[5px]" />
            <div className="ml-5">
              <h1>
                <span className="font-bold">Design Project</span>
              </h1>
              <p className="opacity-50">$500</p>
            </div>
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
                <p className="opacity-50">jongsmith@me.com</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <p className="text-primary">Electronics</p>
          </TableCell>
          <TableCell>
            <div>
              <p>May 24 2025 </p>
              <p className="opacity-50">10:10 AM</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
              <p className="text-green-500">Approveds</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-start justify-start  space-x-5">
              <Eye />
              <Check className="text-green-500" />
              <X className="text-red-500" />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
