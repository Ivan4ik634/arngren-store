'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const UserOrdersTable: FC<Props> = (props) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
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
            <Eye />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserOrdersTable;
