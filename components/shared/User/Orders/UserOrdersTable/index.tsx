'use client';

import OrderItem from '@/components/orders/OrderItem';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OrderWithUserT } from '@/types/OrderT';
import { FC } from 'react';

interface Props {
  data: OrderWithUserT[] | null | undefined;
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
          <OrderItem key={data.id} order={data} />
        ))}
      </TableBody>
    </Table>
  );
};

export default UserOrdersTable;
