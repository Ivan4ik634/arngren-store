'use client';

import OrderItem from '@/components/orders/OrderItem';
import NotFoundData from '@/components/shared/NotFoundData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
        {data?.length ? (
          data?.map((data) => <OrderItem key={data.id} type="user" order={data} />)
        ) : (
          <TableRow>
            <TableCell colSpan={6}>
              <NotFoundData type="orders" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserOrdersTable;
