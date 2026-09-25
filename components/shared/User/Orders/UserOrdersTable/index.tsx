'use client';

import OrderItem from '@/components/orders/OrderItem';
import DrawerDetailsOrder from '@/components/orders/DrawerDetailsOrder';
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
import { statusConfig } from '@/configs/STATUS';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { FC } from 'react';

interface Props {
  data: OrderWithUserT[] | null | undefined;
}

const UserOrdersTable: FC<Props> = ({ data }) => {
  return (
    <>
    <div className="mt-5 space-y-3 lg:hidden">
      {data?.length ? data.map((order) => {
        const status = statusConfig[order.status];
        return (
          <article key={order.id} className="min-w-0 rounded-lg border border-zinc-200 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="break-all font-semibold">{order.order_id}</p>
                <p className="mt-1 text-sm text-muted-foreground">{dayjs(order.created_at).format('MMM DD YYYY')}</p>
              </div>
              <Badge className={status.className}>{status.label}</Badge>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="flex gap-5 text-sm">
                <p><span className="text-muted-foreground">Total</span><br /><strong>${order.total}</strong></p>
                <p><span className="text-muted-foreground">Items</span><br /><strong>{order.items_length}</strong></p>
              </div>
              <DrawerDetailsOrder type="user" order={order} />
            </div>
          </article>
        );
      }) : <NotFoundData type="orders" />}
    </div>
    <div className="hidden lg:block">
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
    </div>
    </>
  );
};

export default UserOrdersTable;
