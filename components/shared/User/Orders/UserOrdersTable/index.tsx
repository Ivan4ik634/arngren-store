'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderT } from '@/types/OrderT';
import dayjs from 'dayjs';
import { Eye } from 'lucide-react';
import { FC } from 'react';

interface Props {
  data: OrderT[] | null | undefined;
}

const UserOrdersTable: FC<Props> = ({ data }) => {
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
        {data?.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.order_id}</TableCell>
            <TableCell>
              <div>
                <p>{dayjs(data.created_at).format('MMM DD YYYY')}</p>
                <p className="opacity-50">{dayjs(data.created_at).format('hh:mm A')}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
                <p className="text-green-500">{data.status}</p>
              </div>
            </TableCell>
            <TableCell className="font-bold">${data.total}</TableCell>
            <TableCell className="">{data.items_length}</TableCell>
            <TableCell className="text-right">
              <Eye />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserOrdersTable;
